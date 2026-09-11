import { expect, test } from "bun:test"
import {
  heldTo,
  reasonSaid,
} from "akasha/checks/modules/refusal-holding/refusal-holding.module.code.ts"

const REASON = 240

const ANSWER = 28000

test("a reason one answer holds whole is carried whole, its lines run together", () => {
  expect(reasonSaid("one\n\ntwo", REASON)).toBe("one two")
})

test("a reason of many lines says how many of those lines went", () => {
  const said = reasonSaid(`22 test files failed:\n${"a/b.test.ts\n".repeat(22)}`, 60)
  expect(said).toContain("22 test files failed:")
  expect(said).toContain("a/b.test.ts")
  expect(said).toContain("(19 lines more)")
})

test("a first line past the ceiling says how many characters went", () => {
  const said = reasonSaid("h".repeat(300), REASON)
  expect(said.startsWith("h".repeat(REASON))).toBe(true)
  expect(said).toContain(`(${300 - REASON} characters more)`)
})

test("more refusals than the ceiling holds keep their start and say how many there are", () => {
  const lines = Array.from({ length: 900 }, (_, at) => `akasha/${at}.ts — ${"held ".repeat(20)}`)
  const said = heldTo(lines, ANSWER)
  expect(said.length).toBeLessThan(lines.length)
  expect(said[said.length - 1]).toContain(`${lines.length} refusals in all`)
  expect(said[said.length - 1]).toContain(`the ${said.length - 1} above`)
  expect(new TextEncoder().encode(said.join("\n")).length).toBeLessThan(ANSWER + 200)
})

test("every refusal remains when they all fit", () => {
  expect(heldTo(["one", "two"], ANSWER)).toEqual(["one", "two"])
})
