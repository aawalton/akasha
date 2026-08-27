import { afterEach, describe, expect, mock, test } from "bun:test"
import { z } from "zod"
import { SIGNED_OUT_MESSAGE } from "~/lib/auth-error"
import { createFetchStub } from "~/lib/fetch-stub"
import { resolveQuestion } from "./resolve-question"

const SentBodySchema = z.record(z.string(), z.unknown())

const originalFetch = globalThis.fetch
afterEach(() => {
  globalThis.fetch = originalFetch
})

function stubResponse(body: unknown, status = 200) {
  const handler = mock(() =>
    Promise.resolve(
      new Response(JSON.stringify(body), {
        status,
        headers: { "content-type": "application/json" },
      })
    )
  )
  globalThis.fetch = createFetchStub(handler)
}

function stubAndCapture(): { readonly sent: () => Record<string, unknown> } {
  let body = "{}"
  const handler = mock((_input: RequestInfo | URL, init?: RequestInit) => {
    body = typeof init?.body === "string" ? init.body : "{}"
    return Promise.resolve(
      new Response(JSON.stringify({ ok: true, nextHref: null }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    )
  })
  globalThis.fetch = createFetchStub(handler)
  return { sent: () => SentBodySchema.parse(JSON.parse(body)) }
}

describe("resolveQuestion", () => {
  test("401 → honest signed-out result, never a retry toast", async () => {
    stubResponse({ error: "unauthorized" }, 401)
    const result = await resolveQuestion({ questionId: "q1", action: "answer", content: "hi" })
    expect(result).toEqual({ ok: false, signedOut: true, error: SIGNED_OUT_MESSAGE })
  })

  test("committed ack → ok with the next href", async () => {
    stubResponse({ ok: true, nextHref: "/questions/next" })
    const result = await resolveQuestion({ questionId: "q1", action: "dismiss" })
    expect(result).toEqual({ ok: true, nextHref: "/questions/next" })
  })

  test("malformed 200 body → retryable error, not signed-out", async () => {
    stubResponse({ nope: 1 })
    const result = await resolveQuestion({ questionId: "q1", action: "answer", content: "x" })
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toBe("That didn't go through. Try again.")
      expect(result.signedOut).toBeFalsy()
    }
  })
})

describe("resolveQuestion — the tapped-option index on the wire", () => {
  test("a tap sends `answeredOptionIndex` alongside the option's text", async () => {
    const { sent } = stubAndCapture()
    await resolveQuestion({
      questionId: "q1",
      action: "answer",
      content: "Yes",
      answeredOptionIndex: 0,
    })
    expect(sent()).toMatchObject({ questionId: "q1", action: "answer", content: "Yes" })
    expect(sent().answeredOptionIndex).toBe(0)
  })

  test("index 0 survives — the falsy index a truthiness check would drop", async () => {
    const { sent } = stubAndCapture()
    await resolveQuestion({
      questionId: "q1",
      action: "answer",
      content: "Yes",
      answeredOptionIndex: 0,
    })
    expect(Object.hasOwn(sent(), "answeredOptionIndex")).toBe(true)
  })

  test("free text sends NO index, even when its text equals an option", async () => {
    const { sent } = stubAndCapture()
    await resolveQuestion({ questionId: "q1", action: "answer", content: "Yes" })
    expect(Object.hasOwn(sent(), "answeredOptionIndex")).toBe(false)
  })

  test("a dismiss carries neither content nor index", async () => {
    const { sent } = stubAndCapture()
    await resolveQuestion({ questionId: "q1", action: "dismiss" })
    expect(sent()).toEqual({ questionId: "q1", action: "dismiss" })
  })
})
