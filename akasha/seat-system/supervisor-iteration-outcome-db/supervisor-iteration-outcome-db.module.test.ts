import { expect, test } from "bun:test"
import { withTimeout } from "./supervisor-iteration-outcome-db.module.code.ts"

test("a call that answers inside the wait answers with its own value", async () => {
  expect(await withTimeout(Promise.resolve(7), "counting")).toBe(7)
})

test("a call that throws inside the wait throws its own fault", async () => {
  await expect(withTimeout(Promise.reject(new Error("its own")), "counting")).rejects.toThrow(
    "its own"
  )
})

// The wait this bounds is five seconds, so proving it runs out takes longer than a test is given.
test("a call that outlives the wait is at fault naming the call and the wait", async () => {
  const never = new Promise<number>(() => {})
  await expect(withTimeout(never, "counting")).rejects.toThrow("counting timed out after 5000ms")
}, 10_000)
