import { describe, expect, test } from "bun:test"
import { createMutex } from "./mutex"

describe("createMutex", () => {
  test("serializes overlapping sections (no interleave)", async () => {
    const { withLock } = createMutex()
    const log: string[] = []
    const section = (id: string, delay: number): Promise<void> =>
      withLock(async () => {
        log.push(`${id}:enter`)
        await new Promise<void>((r) => setTimeout(r, delay))
        log.push(`${id}:exit`)
      })

    await Promise.all([section("a", 20), section("b", 1)])
    expect(log).toEqual(["a:enter", "a:exit", "b:enter", "b:exit"])
  })

  test("a failing section does not poison the chain", async () => {
    const { withLock } = createMutex()
    const failed = withLock(async () => {
      throw new Error("boom")
    })
    await expect(failed).rejects.toThrow("boom")
    const after = await withLock(async () => 42)
    expect(after).toBe(42)
  })

  test("returns the section's resolved value", async () => {
    const { withLock } = createMutex()
    expect(await withLock(async () => "ok")).toBe("ok")
  })

  test("a high-priority waiter drains ahead of earlier-queued normal waiters", async () => {
    const { withLock } = createMutex()
    const log: string[] = []
    const a = withLock(async () => {
      log.push("a:enter")
      await new Promise<void>((r) => setTimeout(r, 20))
      log.push("a:exit")
    })
    const b = withLock(async () => {
      log.push("b")
    }, "normal")
    const c = withLock(async () => {
      log.push("c")
    }, "high")

    await Promise.all([a, b, c])
    expect(log).toEqual(["a:enter", "a:exit", "c", "b"])
  })

  test("preserves FIFO arrival order within the high lane", async () => {
    const { withLock } = createMutex()
    const log: string[] = []
    const a = withLock(async () => {
      await new Promise<void>((r) => setTimeout(r, 20))
    })
    const c1 = withLock(async () => {
      log.push("c1")
    }, "high")
    const c2 = withLock(async () => {
      log.push("c2")
    }, "high")

    await Promise.all([a, c1, c2])
    expect(log).toEqual(["c1", "c2"])
  })

  test("default priority is normal (omitted === normal lane)", async () => {
    const { withLock } = createMutex()
    const log: string[] = []
    const a = withLock(async () => {
      await new Promise<void>((r) => setTimeout(r, 20))
    })
    const b1 = withLock(async () => {
      log.push("b1")
    })
    const b2 = withLock(async () => {
      log.push("b2")
    }, "normal")
    const c = withLock(async () => {
      log.push("c")
    }, "high")

    await Promise.all([a, b1, b2, c])
    expect(log).toEqual(["c", "b1", "b2"])
  })
})
