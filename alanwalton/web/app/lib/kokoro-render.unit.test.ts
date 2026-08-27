import { describe, expect, it } from "bun:test"
import { type EnsureDeps, ensureReadAloudRendition } from "./kokoro-render"

let counter = 0
const freshPageId = (): string => `page-${counter++}`

describe("ensureReadAloudRendition — idempotency + in-flight lock", () => {
  it("returns ready without rendering when a rendition already exists", async () => {
    let renders = 0
    const deps: EnsureDeps = {
      storedExists: async () => true,
      startRender: () => {
        renders++
        return "started"
      },
    }
    expect(await ensureReadAloudRendition(freshPageId(), ["in"], deps)).toBe("ready")
    expect(renders).toBe(0)
  })

  it("collapses two CONCURRENT ensures to a single render (acceptance b)", async () => {
    const pageId = freshPageId()
    let renders = 0
    const deps: EnsureDeps = {
      storedExists: async () => false,
      startRender: () => {
        renders++
        return "started"
      },
    }
    const [a, b] = await Promise.all([
      ensureReadAloudRendition(pageId, ["in"], deps),
      ensureReadAloudRendition(pageId, ["in"], deps),
    ])
    expect(renders).toBe(1)
    expect(a).toBe("generating")
    expect(b).toBe("generating")
  })

  it("reports unavailable and releases the lock when no store is configured", async () => {
    const pageId = freshPageId()
    const deps: EnsureDeps = {
      storedExists: async () => false,
      startRender: () => "unavailable",
    }
    expect(await ensureReadAloudRendition(pageId, ["in"], deps)).toBe("unavailable")
    expect(await ensureReadAloudRendition(pageId, ["in"], deps)).toBe("unavailable")
  })

  it("releases the lock if the stored-existence check throws, not wedged generating", async () => {
    const pageId = freshPageId()
    let calls = 0
    const deps: EnsureDeps = {
      storedExists: async () => {
        calls++
        if (calls === 1) throw new Error("head failed")
        return true
      },
      startRender: () => "started",
    }
    await expect(ensureReadAloudRendition(pageId, ["in"], deps)).rejects.toThrow("head failed")
    expect(await ensureReadAloudRendition(pageId, ["in"], deps)).toBe("ready")
  })
})
