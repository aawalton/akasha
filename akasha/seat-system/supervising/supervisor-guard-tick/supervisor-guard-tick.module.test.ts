import { expect, test } from "bun:test"
import { guardTick } from "./supervisor-guard-tick.module.code.ts"

test("a tick that throws reaches the handler rather than the caller", () => {
  const seen: unknown[] = []
  guardTick(
    () => {
      throw new Error("thrown")
    },
    (err) => seen.push(err)
  )
  expect(seen).toHaveLength(1)
  expect((seen[0] as Error).message).toBe("thrown")
})

test("a tick that rejects reaches the same handler", async () => {
  const seen: unknown[] = []
  guardTick(
    () => Promise.reject(new Error("rejected")),
    (err) => seen.push(err)
  )
  await Promise.resolve()
  await Promise.resolve()
  expect(seen).toHaveLength(1)
  expect((seen[0] as Error).message).toBe("rejected")
})

test("a tick that answers reaches no handler", async () => {
  const seen: unknown[] = []
  guardTick(
    () => Promise.resolve(1),
    (err) => seen.push(err)
  )
  await Promise.resolve()
  expect(seen).toHaveLength(0)
})

test("a throwing tick answers nothing rather than rejecting", () => {
  expect(
    guardTick(
      () => {
        throw new Error("thrown")
      },
      () => undefined
    )
  ).toBeUndefined()
})
