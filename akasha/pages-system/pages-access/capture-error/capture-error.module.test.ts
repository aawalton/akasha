import { expect, test } from "bun:test"
import type { Fetcher } from "@akasha/pages-system-service/calling"
import {
  againValuesFor,
  captureError,
  type ErrorCapturePayload,
  firstValuesFor,
  slugFor,
} from "./capture-error.module.code.ts"

const AN_INSTANT = "2026-09-01T12:00:00.000Z"

const A_REPORT: ErrorCapturePayload = {
  fingerprint: "00384d8d426f113f",
  message: "a thing went wrong",
  stack: "at somewhere (a.ts:1:1)",
  kind: "react-render",
  app: "alanwalton",
  url: "http://localhost:3044/nav",
  userAgent: "a browser",
}

type Sent = { readonly at: string; readonly body: unknown }

function answering(said: readonly unknown[], sent: Sent[]): Fetcher {
  let taken = 0
  return (url, init) => {
    sent.push({ at: url, body: JSON.parse(String(init.body)) })
    const held = said[taken] ?? {}
    taken += 1
    return Promise.resolve(new Response(JSON.stringify(held), { status: 200 }))
  }
}

const noNap = (): Promise<void> => Promise.resolve()

test("a slug leads with the app so a fingerprint never opens a name", () => {
  expect(slugFor(A_REPORT)).toBe("alanwalton-00384d8d426f113f")
})

test("an error met for the first time is filed carrying a count of one", () => {
  const said = firstValuesFor(A_REPORT, AN_INSTANT)
  expect(said.count).toBe(1)
  expect(said.firstSeenAt).toBe(AN_INSTANT)
  expect(said.lastSeenAt).toBe(AN_INSTANT)
})

test("no stack reaches the values a capture writes", () => {
  expect("stack" in firstValuesFor(A_REPORT, AN_INSTANT)).toBe(false)
})

test("a url the report left empty is written into no value", () => {
  expect("url" in firstValuesFor({ ...A_REPORT, url: "" }, AN_INSTANT)).toBe(false)
})

test("an error met again has its count raised by the one report", () => {
  const said = againValuesFor({ slug: "one", count: 7, firstSeenAt: AN_INSTANT }, "later")
  expect(said.count).toBe(8)
  expect(said.lastSeenAt).toBe("later")
})

test("an error met again keeps the moment it was first met", () => {
  const said = againValuesFor({ slug: "one", count: 7, firstSeenAt: AN_INSTANT }, "later")
  expect(said.firstSeenAt).toBe(AN_INSTANT)
})

test("an error whose count was never read is raised to no count at all", () => {
  const said = againValuesFor({ slug: "one", firstSeenAt: AN_INSTANT }, "later")
  expect("count" in said).toBe(false)
})

test("a capture asks what is filed and then writes, in that order", async () => {
  const sent: Sent[] = []
  await captureError(
    A_REPORT,
    "someone <someone@alanwalton.com>",
    answering([{ rows: [] }, { commit: "abc", wrote: ["a"], took: [] }], sent),
    noNap
  )
  expect(sent.map((one) => one.at.split("/").pop())).toEqual(["ask", "write"])
})

test("a capture hands its page over as values rather than as a body", async () => {
  const sent: Sent[] = []
  await captureError(
    A_REPORT,
    "someone <someone@alanwalton.com>",
    answering([{ rows: [] }, { commit: "abc", wrote: ["a"], took: [] }], sent),
    noNap
  )
  const written = sent[1]?.body as { pages?: readonly { slug?: string }[]; puts?: unknown }
  expect(written.puts).toBeUndefined()
  expect(written.pages?.[0]?.slug).toBe("alanwalton-00384d8d426f113f")
})

test("a question the pages refuse leaves nothing written", async () => {
  const sent: Sent[] = []
  const thrown = captureError(
    A_REPORT,
    "someone <someone@alanwalton.com>",
    answering([{ refused: "no such page type" }], sent),
    noNap
  )
  await expect(thrown).rejects.toThrow("no such page type")
  expect(sent.length).toBe(1)
})

test("a write the pages refuse is thrown rather than answered", async () => {
  const sent: Sent[] = []
  const thrown = captureError(
    A_REPORT,
    "someone <someone@alanwalton.com>",
    answering([{ rows: [] }, { refused: "a write says what it is for" }], sent),
    noNap
  )
  await expect(thrown).rejects.toThrow("a write says what it is for")
})

test("a write that landed no commit is answered rather than refused", async () => {
  const said = await captureError(
    A_REPORT,
    "someone <someone@alanwalton.com>",
    answering([{ rows: [] }, { commit: null, wrote: ["a"], took: [] }], []),
    noNap
  )
  expect(said.commit).toBeNull()
})
