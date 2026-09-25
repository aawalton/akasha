import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import {
  gapCountIn,
  gapRowsAt,
  gapsKept,
} from "akasha/alan/harness/code-editor/data-interface/modules/gap-row-filing/gap-row-filing.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Judging } from "akasha/check/modules/judging/judging.module.code.ts"
import { landing } from "akasha/command/modules/landing/landing.module.code.ts"
import {
  scratch as repos,
  repoWith,
} from "akasha/command/modules/landing/landing.module.test-fixtures.ts"
import { scratchWorld } from "akasha/file/system/modules/scratching/scratching.module.code.ts"
import { readingIn } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const scratch = scratchWorld()

afterAll(repos.sweep)

const ONE_AT = "domain/one/pages/one.thing.ts"

const TWO_AT = "domain/one/pages/two.thing.ts"

const TWO_BODY = `export const two = {
  type: "page-type/thing",
  slug: "two",
  decisions: [{ decisionKind: "decision-kind/gap", statement: "the second gap" }],
} as const
`

function changeOn(
  root: string,
  changed: readonly string[],
  bodies: Record<string, string>
): Change {
  return {
    root,
    base: "",
    changed,
    before: () => null,
    after: (path) => {
      const body = bodies[path]
      return body === undefined ? null : new TextEncoder().encode(body)
    },
  }
}

function filed(root: string, rows: readonly unknown[]): undefined {
  const at = join(root, gapRowsAt())
  mkdirSync(dirname(at), { recursive: true })
  writeFileSync(at, rows.map((one) => `${JSON.stringify(one)}\n`).join(""))
}

test("the rows are filed beside the picture they are drawn into", () => {
  expect(gapRowsAt()).toBe(
    "alan/harness/code-editor/data-interface/pages/gap-tree/" +
      "gap-tree.code-editor-data-interface.rows.uncommitted.jsonl"
  )
})

test("a repository with no page holds no row and asks for no change", () => {
  const root = scratch.rootFor("akasha-gap-rows-")

  const said = gapsKept(changeOn(root, [], {}), readingIn(root))

  expect(said.gaps).toEqual([])
  expect(said.edits).toEqual([])
})

test("a page the change names is read again and the rest are taken as filed", () => {
  const root = scratch.rootFor("akasha-gap-rows-")
  filed(root, [{ at: ONE_AT, domain: "thing/one", place: 1, said: "the first gap" }])

  const said = gapsKept(changeOn(root, [TWO_AT], { [TWO_AT]: TWO_BODY }), readingIn(root))

  expect(said.gaps).toEqual([
    { at: ONE_AT, domain: "thing/one", place: 1, said: "the first gap" },
    { at: TWO_AT, domain: "thing/two", place: 1, said: "the second gap" },
  ])
  expect(said.edits.length).toBe(1)
})

test("a page the change takes away loses its rows", () => {
  const root = scratch.rootFor("akasha-gap-rows-")
  filed(root, [{ at: ONE_AT, domain: "thing/one", place: 1, said: "the first gap" }])

  const said = gapsKept(changeOn(root, [ONE_AT], {}), readingIn(root))

  expect(said.gaps).toEqual([])
})

test("a filed line not shaped as a gap row is read by reading every page once", () => {
  const root = scratch.rootFor("akasha-gap-rows-")
  filed(root, [{ at: ONE_AT, domain: "thing/one" }])

  const said = gapsKept(changeOn(root, [], {}), readingIn(root))

  expect(said.gaps).toEqual([])
})

test("the gaps counted are the rows filed", () => {
  const root = scratch.rootFor("akasha-gap-rows-")
  filed(root, [
    { at: ONE_AT, domain: "thing/one", place: 1, said: "the first gap" },
    { at: TWO_AT, domain: "thing/two", place: 1, said: "the second gap" },
  ])

  expect(gapCountIn(root)).toBe(2)
})

const gapAt = (page: string, place: number): string =>
  JSON.stringify({ at: `domain/${page}.thing.ts`, domain: `thing/${page}`, place, said: page })

const bodyFor = (lines: readonly string[]): string => lines.map((one) => `${one}\n`).join("")

test("a landing overlapping another keeps the rows the other filed rather than writing back what it read", async () => {
  const was = bodyFor([gapAt("a", 1), gapAt("b", 1), gapAt("c", 1)])
  const root = repoWith({ ".gitignore": "*.uncommitted.*\n", [gapRowsAt()]: was })
  const overlapping: Judging = {
    named: ["overlapping"],
    checksFor: () => ["overlapping"],
    over: async () => {
      writeFileSync(join(root, gapRowsAt()), bodyFor([gapAt("a", 1), gapAt("c", 1)]))
      return []
    },
  }
  const mine = bodyFor([gapAt("a", 1), gapAt("a", 10), gapAt("a", 2), gapAt("b", 1), gapAt("c", 1)])
  const rows: readonly FileChange[] = [
    { kind: "replace", path: gapRowsAt(), contentFrom: was, contentTo: mine },
  ]

  expect("refusals" in (await landing(root, rows, "mine", overlapping))).toBe(false)
  expect(readFileSync(join(root, gapRowsAt()), "utf8")).toBe(
    bodyFor([gapAt("a", 1), gapAt("a", 2), gapAt("a", 10), gapAt("c", 1)])
  )
})

test("a repository with no row filed counts the gaps its pages state", () => {
  const root = scratch.rootFor("akasha-gap-rows-")

  expect(gapCountIn(root)).toBe(0)
})
