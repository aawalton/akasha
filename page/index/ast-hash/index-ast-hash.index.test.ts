import { expect, test } from "bun:test"
import {
  astHashAt,
  astHashesIn,
  speltUnder,
} from "akasha/page/index/ast-hash/index-ast-hash.index.code.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const REPO = "/repo"

const ENDING = ".jsonl"

const ONE = "/repo/one/one.module.code.ts"

const TWO = "/repo/two/two.module.code.ts"

const BODY = `export function kept(rows: readonly string[]): readonly string[] {
  return rows.filter((one) => one !== "")
}
`

const RENAMED = `export function held(items: readonly string[]): readonly string[] {
  return items.filter((each) => each !== "")
}
`

function readingOf(lines: ReadonlyMap<string, readonly string[]>): Reading {
  return {
    holds: (at) => lines.has(at),
    listing: () => [],
    lines: (at) => lines.get(at) ?? [],
    read: () => null,
  }
}

test("a key is filed under its last two characters", () => {
  expect(astHashAt("0123456789abcdef0123456789abcdef")).toBe(
    "ast-hash/ef/0123456789abcdef0123456789abcdef.jsonl"
  )
})

test("a function is filed under the key its rule condenses to", () => {
  const [one] = astHashesIn(ONE, BODY, REPO)
  expect(one?.line).toBe(JSON.stringify({ path: "one/one.module.code.ts", name: "kept" }))
})

test("renaming a function and what it binds files it under the same key", () => {
  const [one] = astHashesIn(ONE, BODY, REPO)
  const [two] = astHashesIn(TWO, RENAMED, REPO)
  expect(one?.at).toBe(two?.at ?? "")
})

test("a file the compiler reads as anything but TypeScript is filed nowhere", () => {
  expect(astHashesIn("/repo/one/one.module.md", BODY, REPO)).toEqual([])
})

test("the files under a key are read back with the names they bind", () => {
  const [one] = astHashesIn(ONE, BODY, REPO)
  const [two] = astHashesIn(TWO, RENAMED, REPO)
  const at = one?.at ?? ""
  const reading = readingOf(new Map([[at, [one?.line ?? "", two?.line ?? ""]]]))
  const hash = at.slice(at.lastIndexOf("/") + 1, -ENDING.length)
  expect(speltUnder(reading, hash)).toEqual([
    { path: "one/one.module.code.ts", name: "kept" },
    { path: "two/two.module.code.ts", name: "held" },
  ])
})
