import { describe, expect, test } from "bun:test"
import { createSaveQueue } from "./save-queue.ts"

const REFUSAL = new Error(
  "patchPage(note): the write of `note-1` did not land — the page write service could not be reached"
)

function refuses(): Promise<void> {
  return Promise.reject(REFUSAL)
}

function lands(): Promise<void> {
  return Promise.resolve()
}

describe("createSaveQueue — never let a failed write return like a done one", () => {
  test("a write that does not land rejects the caller and tells the user", async () => {
    const told: string[] = []
    const queue = createSaveQueue(() => {
      told.push("told")
      return undefined
    })
    await expect(queue.enqueue(refuses)).rejects.toBe(REFUSAL)
    expect(told).toEqual(["told"])
  })

  test("a write that lands resolves the caller and says nothing", async () => {
    const told: string[] = []
    const queue = createSaveQueue(() => {
      told.push("told")
      return undefined
    })
    await queue.enqueue(lands)
    expect(told).toEqual([])
  })

  test("a write that does not land leaves the writes behind it still running", async () => {
    const queue = createSaveQueue(() => undefined)
    await expect(queue.enqueue(refuses)).rejects.toBe(REFUSAL)
    let ran = false
    await queue.enqueue(async () => {
      ran = true
    })
    expect(ran).toBe(true)
  })

  test("writes run one at a time, in the order they were handed over", async () => {
    const queue = createSaveQueue(() => undefined)
    const order: string[] = []
    const slow = queue.enqueue(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10))
      order.push("first")
    })
    const quick = queue.enqueue(async () => {
      order.push("second")
    })
    await Promise.all([slow, quick])
    expect(order).toEqual(["first", "second"])
  })
})
