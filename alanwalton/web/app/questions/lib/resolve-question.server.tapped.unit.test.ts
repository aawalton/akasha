import { afterEach, describe, expect, test } from "bun:test"
import {
  ASKED_BY,
  deps,
  OWNER_ID,
  realPage,
  req,
  reset,
  state,
  writePage,
} from "./_resolve-question-test-helpers"
import { resolveQuestion } from "./resolve-question.server"

describe("resolveQuestion — tapped option vs free text", () => {
  const OPTIONS = ["Yes", "No, I was doing something else"]

  afterEach(() => {
    reset()
  })

  function resetWithOptions(): undefined {
    reset()
    state.getPageRow = realPage({
      id: "q1",
      title: "Still on the same block?",
      slug: "still-on-the-same-block",
      askedBy: ASKED_BY,
      status: "open",
      userId: OWNER_ID,
      options: OPTIONS,
    })
  }

  test("VERDICT A — a verified tap does NOT wake the asker, and records which option", async () => {
    resetWithOptions()
    const result = await resolveQuestion(
      req({ action: "answer", content: "Yes", answeredOptionIndex: 0 }),
      deps
    )

    expect(result).toEqual({ ok: true, nextHref: null })
    expect(state.calls).toEqual(["patch"])
    expect(writePage).not.toHaveBeenCalled()
    expect(state.patchSet?.answeredOptionIndex).toBe(0)
    expect(state.patchSet?.answer).toBe("Yes")
    expect(state.patchSet?.status).toBe("answered")
  })

  test("VERDICT B — free text DOES wake the asker, and records no option index", async () => {
    resetWithOptions()
    const result = await resolveQuestion(
      req({ action: "answer", content: "Actually I moved to errands" }),
      deps
    )

    expect(result).toEqual({ ok: true, nextHref: null })
    expect(state.calls).toEqual(["deliver", "patch"])
    expect(state.sendArgs[0]).toMatchObject({ from: "question-answer" })
    expect(state.patchSet?.answeredOptionIndex).toBeUndefined()
    expect(state.patchSet?.answer).toBe("Actually I moved to errands")
  })

  test("free text identical to an option's text still wakes the asker", async () => {
    resetWithOptions()
    await resolveQuestion(req({ action: "answer", content: "Yes" }), deps)

    expect(state.calls).toContain("deliver")
    expect(state.patchSet?.answeredOptionIndex).toBeUndefined()
  })

  test("an index that does not match the content degrades to the waking path", async () => {
    resetWithOptions()
    const result = await resolveQuestion(
      req({ action: "answer", content: "Something else entirely", answeredOptionIndex: 0 }),
      deps
    )

    expect(result).toEqual({ ok: true, nextHref: null })
    expect(state.calls).toContain("deliver")
    expect(state.patchSet?.answeredOptionIndex).toBeUndefined()
    expect(state.patchSet?.answer).toBe("Something else entirely")
  })

  test("an out-of-range index degrades to the waking path", async () => {
    resetWithOptions()
    await resolveQuestion(req({ action: "answer", content: "Yes", answeredOptionIndex: 7 }), deps)

    expect(state.calls).toContain("deliver")
    expect(state.patchSet?.answeredOptionIndex).toBeUndefined()
  })

  test("a verified tap lands even when the asker is unreachable", async () => {
    resetWithOptions()
    state.personaTargets = []
    const result = await resolveQuestion(
      req({ action: "answer", content: "Yes", answeredOptionIndex: 0 }),
      deps
    )

    expect(result).toEqual({ ok: true, nextHref: null })
    expect(state.patchCalled).toBe(true)
    expect(state.patchSet?.answeredOptionIndex).toBe(0)
  })

  test("free text still REFUSES to flip when the asker is unreachable", async () => {
    resetWithOptions()
    state.personaTargets = []
    const result = await resolveQuestion(
      req({ action: "answer", content: "Actually I moved to errands" }),
      deps
    )

    expect(result.ok).toBe(false)
    expect(state.patchCalled).toBe(false)
  })

  test("the question read selects `options`, the array the index is verified against", async () => {
    resetWithOptions()
    await resolveQuestion(req({ action: "answer", content: "Yes", answeredOptionIndex: 0 }), deps)

    expect(state.selectedKeys).toContain("options")
  })

  test("the flip's status transition is unchanged on BOTH paths (the APNs leg's only input)", async () => {
    resetWithOptions()
    await resolveQuestion(req({ action: "answer", content: "Yes", answeredOptionIndex: 0 }), deps)
    expect(state.patchSet?.status).toBe("answered")

    resetWithOptions()
    await resolveQuestion(req({ action: "answer", content: "Custom" }), deps)
    expect(state.patchSet?.status).toBe("answered")
  })

  test("a tap on a question carrying NO options degrades to the waking path", async () => {
    reset()
    await resolveQuestion(req({ action: "answer", content: "Yes", answeredOptionIndex: 0 }), deps)

    expect(state.calls).toContain("deliver")
    expect(state.patchSet?.answeredOptionIndex).toBeUndefined()
  })
})
