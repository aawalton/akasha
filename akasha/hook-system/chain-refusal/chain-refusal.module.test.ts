import { expect, test } from "bun:test"
import { judgingCalls, refusalOver } from "./chain-refusal.module.code.ts"

const NO = "no"

function refusalFor(call: string): string | null {
  return call.startsWith(NO) ? `${call} is refused` : null
}

test("the first refusal answers the whole line", () => {
  expect(refusalOver(["one", "no-two", "no-three"], refusalFor)).toBe("no-two is refused")
})

test("a call refused is not let through by the ones chained after it", () => {
  expect(refusalOver(["no-one", "two"], refusalFor)).toBe("no-one is refused")
})

test("a line whose calls are every one allowed is not refused", () => {
  expect(refusalOver(["one", "two"], refusalFor)).toBeNull()
})

test("a line carrying no call at all is refused for nothing", () => {
  expect(refusalOver([], refusalFor)).toBeNull()
})

test("judging stops at the first refusal", () => {
  const seen: string[] = []
  refusalOver(["one", "no-two", "no-three"], (call) => {
    seen.push(call)
    return refusalFor(call)
  })
  expect(seen).toEqual(["one", "no-two"])
})

test("a judgement bound to a reader of calls answers a whole line", () => {
  const judging = judgingCalls((command: string) => command.split(" "), refusalFor)
  expect(judging("one no-two")).toBe("no-two is refused")
  expect(judging("one two")).toBeNull()
})

test("the calls are read from the line handed in, never from the binding", () => {
  const seen: string[] = []
  const judging = judgingCalls((command: string) => {
    seen.push(command)
    return command.split(" ")
  }, refusalFor)
  judging("one")
  judging("two")
  expect(seen).toEqual(["one", "two"])
})
