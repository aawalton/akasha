import { expect, test } from "bun:test"
import { TickDeadlineExceededError, withTickDeadline } from "./tick-deadline.module.code.ts"

test("a tick inside its ceiling answers", async () => {
  await expect(withTickDeadline("here", async () => 7, 1000)).resolves.toBe(7)
})

test("a tick that outruns its ceiling throws, naming the label and the ceiling", async () => {
  const never = new Promise<never>(() => {})
  await expect(withTickDeadline("here", () => never, 5)).rejects.toThrow(
    "here: tick deadline exceeded after 5ms"
  )
})

test("the ceiling throw is told apart by its own name", async () => {
  const never = new Promise<never>(() => {})
  try {
    await withTickDeadline("here", () => never, 5)
    throw new Error("the ceiling did not throw")
  } catch (error) {
    expect(error).toBeInstanceOf(TickDeadlineExceededError)
    expect((error as Error).name).toBe("TickDeadlineExceededError")
  }
})

test("a tick asked for after the stop was asked is refused before it starts", async () => {
  const control = new AbortController()
  control.abort(new Error("asked to stop"))
  let ran = false
  await expect(
    withTickDeadline(
      "here",
      async () => {
        ran = true
        return 1
      },
      1000,
      control.signal
    )
  ).rejects.toThrow("asked to stop")
  expect(ran).toBe(false)
})

test("a stop asked during a tick ends the wait", async () => {
  const control = new AbortController()
  const never = new Promise<never>(() => {})
  setTimeout(() => control.abort(new Error("asked to stop")), 5)
  await expect(withTickDeadline("here", () => never, 10_000, control.signal)).rejects.toThrow(
    "asked to stop"
  )
})

test("a tick that answers takes its listener off the signal", async () => {
  const control = new AbortController()
  await withTickDeadline("here", async () => 1, 1000, control.signal)
  // A listener left behind would still be counted here.
  expect(control.signal.aborted).toBe(false)
})
