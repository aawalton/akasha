import { expect, test } from "bun:test"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { overLongAfter } from "akasha/command/modules/draft-length/draft-length.module.code.ts"

const AT = "lore/hall.lore.ts"

const BODY = `export const hall = {\n  facts: [],\n} as const\n`

const BODIES: ReadonlyMap<string, string> = new Map([[AT, BODY]])

function bodyOf(path: string): string | null {
  return BODIES.get(path) ?? null
}

const none = (): boolean => false

function grown(by: number): FileChange {
  return { kind: "replace", path: AT, contentFrom: "[]", contentTo: `["${"a".repeat(by)}"]` }
}

const SMALL = grown(100)

const HUGE = grown(15_000)

test("a draft leaving a body under its ceiling is not refused", () => {
  expect(overLongAfter(bodyOf, [SMALL], [SMALL], none)).toEqual([])
})

test("a draft leaving a body over its ceiling names the path and the ceiling", () => {
  const said = overLongAfter(bodyOf, [HUGE], [HUGE], none)
  expect(said).toHaveLength(1)
  expect(said[0]).toStartWith(`\`${AT}\` would be `)
  expect(said[0]).toContain("over the 15,000 byte ceiling")
})

test("an edit kept earlier is replayed before the new one is measured", () => {
  const more: FileChange = {
    kind: "replace",
    path: AT,
    contentFrom: "facts:",
    contentTo: "facts: /* more */",
  }
  expect(overLongAfter(bodyOf, [HUGE, more], [more], none)).toHaveLength(1)
})

test("a path the landing's check lets off is not measured", () => {
  expect(overLongAfter(bodyOf, [HUGE], [HUGE], () => true)).toEqual([])
})

test("a body the new edits do not touch is not measured", () => {
  const other: FileChange = { kind: "add", path: "lore/other.lore.ts", content: "export {}\n" }
  expect(overLongAfter(bodyOf, [HUGE, other], [other], none)).toEqual([])
})
