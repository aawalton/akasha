import { afterEach, beforeEach, describe, expect, it } from "bun:test"
import { enqueueChapterCompletion } from "./offline-text"
import { OFFLINE_COMPLETIONS_CHANGED_EVENT } from "./offline-text-cache"
import { buildReadCompletionReport } from "./read-completion-diagnostics"

describe("buildReadCompletionReport — durable breadcrumb contract (#14959)", () => {
  it("maps each reason to a stable `[read-completion]` message under the native app", () => {
    expect(buildReadCompletionReport("enqueued", "pageId=abcdef01")).toEqual({
      message: "[read-completion] enqueued",
      stack: "pageId=abcdef01",
      kind: "error",
      app: "alanwalton-native",
      errorUserId: null,
    })
  })

  it("falls back to the reason as the detail so `stack` is never empty", () => {
    expect(buildReadCompletionReport("drain-skipped-busy").stack).toBe("drain-skipped-busy")
  })

  it("carries no project number in the runtime message (No Historical References)", () => {
    const report = buildReadCompletionReport("drain-result", "synced=0 failed=1 err=boom")
    expect(report.message).not.toMatch(/#\d/)
    expect(report.stack).not.toMatch(/#\d/)
  })
})

describe("enqueueChapterCompletion — drain-signal on native FS outcome (#14959)", () => {
  let signalFired = 0
  const listener = () => {
    signalFired += 1
  }

  const installFilesystem = (writeFile: () => Promise<void>) => {
    Object.assign(window, {
      Capacitor: {
        Plugins: {
          Filesystem: {
            readFile: () => Promise.reject(new Error("ENOENT")),
            writeFile,
            rename: () => Promise.resolve(),
          },
        },
      },
    })
  }

  beforeEach(() => {
    signalFired = 0
    window.addEventListener(OFFLINE_COMPLETIONS_CHANGED_EVENT, listener)
  })

  afterEach(() => {
    window.removeEventListener(OFFLINE_COMPLETIONS_CHANGED_EVENT, listener)
    Object.assign(window, { Capacitor: undefined })
  })

  it("fires the drain signal when the native queue write succeeds", async () => {
    installFilesystem(() => Promise.resolve())
    await enqueueChapterCompletion("chapter-abcdef01", "2026-07-11T14:00:00.000Z", 100)
    expect(signalFired).toBe(1)
  })

  it("suppresses the drain signal when the native queue write throws", async () => {
    installFilesystem(() => Promise.reject(new Error("disk full")))
    await enqueueChapterCompletion("chapter-abcdef01", "2026-07-11T14:00:00.000Z", 100)
    expect(signalFired).toBe(0)
  })
})
