import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  foundIn,
  lookedOver,
  reasonOf,
  refusalsOver,
  swiftNamed,
} from "akasha/check/code/pages/swift-parses/swift-parses.check-code.decision.code.ts"
import {
  BROKEN,
  BROKEN_LINE,
  CLEAN,
  ONE,
  rooted,
  scratch,
  UNCLOSED,
} from "akasha/check/code/pages/swift-parses/swift-parses.check-code.decision.test-fixtures.ts"
import { bytesOf } from "akasha/check/test/fixture/bodying/bodying.test-fixture.code.ts"
import {
  change,
  landing,
  proposing,
} from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"

const AWAY = "/held"

const TWO = "akasha/two.swift"

afterAll(scratch.sweep)

test("a file is Swift by the kind its name gives it", () => {
  expect([ONE, TWO, "akasha/one.sh", "akasha/one.swift.ts"].map(swiftNamed)).toEqual([
    true,
    true,
    false,
    false,
  ])
})

test("a change carrying no Swift is judged by no run", () => {
  expect(refusalsOver(landing(AWAY, { "akasha/held.md": bytesOf("held") }))).toEqual([])
})

test("Swift that parses is not refused, whatever Apple module it imports", () => {
  expect(refusalsOver(landing(AWAY, { [ONE]: bytesOf(CLEAN) }))).toEqual([])
})

test("Swift that does not parse is refused at the line the parser faulted", () => {
  const said = refusalsOver(landing(AWAY, { [ONE]: bytesOf(BROKEN), [TWO]: bytesOf(CLEAN) }))
  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(said[0]?.reason).toContain(`line ${BROKEN_LINE}`)
  expect(said[0]?.reason).toContain(UNCLOSED)
  expect(said[0]?.threw).toBeUndefined()
})

test("a change is judged by the body it proposes, not the one on disk", () => {
  const root = rooted()
  const at = join(root, ONE)
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, CLEAN)
  const said = refusalsOver(change(root, [ONE], proposing(root, ONE, BROKEN)))
  expect(said.map((one) => one.path)).toEqual([ONE])
  expect(readFileSync(at, "utf8")).toBe(CLEAN)
  expect(refusalsOver(change(root, [ONE]))).toEqual([])
})

test("only an error the parser says is a fault, and its path is read under the mirror", () => {
  const err = [
    `${AWAY}/${ONE}:3:4: warning: [Indentation] unindent by 2 spaces`,
    `${AWAY}/${ONE}:5:16: error: ${UNCLOSED}`,
  ].join("\n")
  expect(foundIn(err, AWAY)).toEqual([{ path: ONE, line: 5, column: 16, said: UNCLOSED }])
})

test("a parser that could not run looked at nothing", () => {
  const looked = lookedOver(AWAY, [ONE], null)
  expect(looked.found).toEqual([])
  expect(looked.failed).toContain("is on PATH")
})

test("a fault is said as where it is and what the parser said", () => {
  expect(reasonOf({ path: ONE, line: 12, column: 7, said: "Held." })).toBe(
    "the Swift does not parse at line 12, column 7 — Held."
  )
})
