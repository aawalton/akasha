import { afterEach, describe, expect, test } from "bun:test"
import {
  ACTIONS,
  AGENT_ID,
  ASKED_BY,
  deliveredContent,
  deps,
  FOREIGN_ID,
  OWNER_ID,
  patchPage,
  realPage,
  req,
  reset,
  state,
  writePage,
} from "./_resolve-question-test-helpers"
import { TRACKING_HOURLY_CONFIRM_SOURCE } from "./hourly-confirm-source"
import { resolveQuestion } from "./resolve-question.server"

describe("resolveQuestion", () => {
  afterEach(() => {
    reset()
  })

  test("answer delivers to the asker BEFORE flipping status to answered", async () => {
    reset()
    const result = await resolveQuestion(req({ action: "answer", content: "Yes, ship it." }), deps)

    expect(result).toEqual({ ok: true, nextHref: null })
    expect(state.calls).toEqual(["deliver", "patch"])
    expect(state.sendArgs[0]).toMatchObject({ to: "asker-persona" })
    const delivered = deliveredContent()
    expect(state.sendArgs[0]).toMatchObject({ from: "question-answer" })
    expect(delivered).toContain("Yes, ship it.")
    expect(delivered).toContain(OWNER_ID)
    expect(state.patchSet?.status).toBe("answered")
    expect(typeof state.patchSet?.answeredAt).toBe("number")
    expect(state.patchSet?.answer).toBe("Yes, ship it.")
  })

  test("answer stores the TRIMMED content on the row", async () => {
    reset()
    await resolveQuestion(req({ action: "answer", content: "  Ship it.  " }), deps)
    expect(deliveredContent().startsWith("Ship it.")).toBe(true)
    expect(state.patchSet?.answer).toBe("Ship it.")
  })

  test("dismiss does NOT set an answer on the row", async () => {
    reset()
    await resolveQuestion(req({ action: "dismiss" }), deps)
    expect(state.patchSet?.status).toBe("dismissed")
    expect(state.patchSet?.answer).toBeUndefined()
  })

  test("answer with a failed delivery does NOT flip status", async () => {
    reset()
    state.insertThrows = true

    const result = await resolveQuestion(req({ action: "answer", content: "Yes, ship it." }), deps)

    expect(result.ok).toBe(false)
    expect(state.patchCalled).toBe(false)
    expect(patchPage).not.toHaveBeenCalled()
  })

  test("answer with empty content returns a typed error and never delivers", async () => {
    reset()
    const result = await resolveQuestion(req({ action: "answer", content: "   " }), deps)
    expect(result).toEqual({ ok: false, error: "An answer requires non-empty content" })
    expect(writePage).not.toHaveBeenCalled()
    expect(patchPage).not.toHaveBeenCalled()
  })

  test("dismiss flips to dismissed even when the asker is unresolved", async () => {
    reset()
    state.personaTargets = []

    const result = await resolveQuestion(req({ action: "dismiss" }), deps)

    expect(result.ok).toBe(true)
    expect(writePage).not.toHaveBeenCalled()
    expect(state.patchCalled).toBe(true)
    expect(state.patchSet?.status).toBe("dismissed")
  })

  test("dismiss delivers a best-effort notice, then flips", async () => {
    reset()
    const result = await resolveQuestion(req({ action: "dismiss" }), deps)

    expect(result.ok).toBe(true)
    expect(state.calls).toEqual(["deliver", "patch"])
    expect(state.sendArgs[0]).toMatchObject({ from: "question-dismiss" })
    expect(state.patchSet?.status).toBe("dismissed")
  })

  test("dismiss delivers NO notice where an automation filed the question", async () => {
    reset()
    state.getPageRow = realPage({
      id: "q1",
      title: "Still Church s4d3?",
      slug: "still-church",
      askedBy: ASKED_BY,
      status: "open",
      userId: OWNER_ID,
      sourceContext: TRACKING_HOURLY_CONFIRM_SOURCE,
    })

    const result = await resolveQuestion(req({ action: "dismiss" }), deps)

    expect(result.ok).toBe(true)
    expect(state.calls).toEqual(["patch"])
    expect(writePage).not.toHaveBeenCalled()
    expect(state.patchSet?.status).toBe("dismissed")
  })

  test("dismiss still delivers where a LIVE SEAT filed the question", async () => {
    reset()
    state.getPageRow = realPage({
      id: "q1",
      title: "Ship it?",
      slug: "ship-it",
      askedBy: ASKED_BY,
      status: "open",
      userId: OWNER_ID,
      sourceContext: AGENT_ID,
    })

    const result = await resolveQuestion(req({ action: "dismiss" }), deps)

    expect(result.ok).toBe(true)
    expect(state.calls).toEqual(["deliver", "patch"])
    expect(state.sendArgs[0]).toMatchObject({ to: "asker-persona", from: "question-dismiss" })
    expect(state.patchSet?.status).toBe("dismissed")
  })

  test("nextHref picks the oldest OTHER open question", async () => {
    reset()
    state.getPagesRows = [
      realPage({ id: "q1", title: "Ship it?", slug: "ship-it" }),
      realPage({ id: "11111111-2222-3333-4444-555566667777", title: "Second", slug: "second" }),
    ]

    const result = await resolveQuestion(req({ action: "dismiss" }), deps)

    expect(result).toEqual({ ok: true, nextHref: "/question/second-66667777" })
  })

  test("nextHref is null when no other open question remains", async () => {
    reset()
    state.getPagesRows = [realPage({ id: "q1", title: "Ship it?", slug: "ship-it" })]

    const result = await resolveQuestion(req({ action: "dismiss" }), deps)

    expect(result).toEqual({ ok: true, nextHref: null })
  })

  test.each(ACTIONS)("%s by a NON-owner does nothing", async (action) => {
    reset()
    const args = req({ action, content: "Yes.", sessionUserId: FOREIGN_ID })

    const result = await resolveQuestion(args, deps)

    expect(result).toEqual({ ok: false, error: "Question q1 not found" })
    expect(writePage).not.toHaveBeenCalled()
    expect(patchPage).not.toHaveBeenCalled()
  })

  test.each(ACTIONS)("the %s flip carries the owner narrow, not just the read", async (action) => {
    reset()
    await resolveQuestion(req({ action, content: "Yes." }), deps)

    expect(state.patchWhere).toEqual([
      { key: "id", eq: "q1" },
      { key: "userId", eq: OWNER_ID },
    ])
  })
})
