import { afterEach, describe, expect, it } from "bun:test"
import { enqueueChapterCompletion } from "./offline-text"
import { OFFLINE_COMPLETIONS_CHANGED_EVENT } from "./offline-text-cache"

describe("enqueueChapterCompletion — drain signal (#14959 link c)", () => {
  let fired = 0
  const listener = () => {
    fired += 1
  }

  afterEach(() => {
    window.removeEventListener(OFFLINE_COMPLETIONS_CHANGED_EVENT, listener)
    fired = 0
  })

  it("dispatches offline-completions-changed so the sync worker drains now", async () => {
    window.addEventListener(OFFLINE_COMPLETIONS_CHANGED_EVENT, listener)
    await enqueueChapterCompletion("chapter-abc", "2026-07-10T05:00:00.000Z", 100)
    expect(fired).toBe(1)
  })
})
