import { expect, test } from "bun:test"
import {
  DB_CALL_TIMEOUT_MS,
  withTimeout,
} from "akasha/seat-system/supervisor-iteration-outcome-db/supervisor-iteration-outcome-db.module.code.ts"

test("a call that answers inside the wait answers with its own value", async () => {
  expect(await withTimeout(Promise.resolve(7), "counting")).toBe(7)
})

test("a call that throws inside the wait throws its own fault", async () => {
  await expect(withTimeout(Promise.reject(new Error("its own")), "counting")).rejects.toThrow(
    "its own"
  )
})

test("a call that outlives the wait is at fault naming the call and the wait", async () => {
  const never = new Promise<number>(() => {})
  await expect(withTimeout(never, "counting", 20)).rejects.toThrow("counting timed out after 20ms")
})

test("a caller stating no wait is given five seconds", () => {
  expect(DB_CALL_TIMEOUT_MS).toBe(5_000)
})
