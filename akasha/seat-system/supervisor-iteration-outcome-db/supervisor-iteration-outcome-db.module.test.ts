import { expect, test } from "bun:test"
import { withTimeout } from "./supervisor-iteration-outcome-db.module.code.ts"

test("a call that answers inside the wait answers with its own value", async () => {
  expect(await withTimeout(Promise.resolve(7), "counting")).toBe(7)
})

test("a call that throws inside the wait throws its own fault", () => {
  const said = withTimeout(Promise.reject(new Error("its own")), "counting")
  expect(said).rejects.toThrow("its own")
})

test("a call that outlives the wait is at fault naming the call and the wait", () => {
  const never = new Promise<number>(() => {})
  expect(withTimeout(never, "counting")).rejects.toThrow("counting timed out after 5000ms")
})
