import { expect, test } from "bun:test"
import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { changeGenerator } from "akasha/change/generator/change-generator.page-type.ts"
import { module } from "akasha/code/module/module.page-type.ts"
import { domain } from "akasha/domain/domain.page-type.ts"
import { turnedWhole } from "akasha/page/index/modules/generator-turning/generator-turning.module.code.ts"
import {
  bodyOf,
  idOf,
  indexedRepo,
} from "akasha/page/index/test-fixtures/fixture-world/fixture-world.test-fixture.code.ts"
import { pageType } from "akasha/page/type/page-type.page-type.ts"

const DOMAIN_AT = `${pageType.slug}/${domain.slug}` as const

const MODULE_AT = `${pageType.slug}/${module.slug}` as const

const MADE_AT = "akasha/made.txt"

const MAKING = `const AT = "${MADE_AT}"
const BODY = "made\\n"
export function generateChange(change) {
  const held = change.after(AT)
  const was = held === null ? null : new TextDecoder().decode(held)
  if (was === BODY) return { edits: [], said: [] }
  const edit = was === null
    ? { kind: "add", path: AT, content: BODY }
    : { kind: "replace", path: AT, contentFrom: was, contentTo: BODY }
  return { edits: [edit], said: [] }
}
export function couldTurn() {
  return false
}
`

function world(code: string): string {
  return indexedRepo({
    "akasha/page-type.page-type.ts": bodyOf({
      id: idOf("2"),
      type: `${pageType.slug}/${pageType.slug}`,
      slug: "page-type",
      extends: [DOMAIN_AT],
      properties: [],
    }),
    "akasha/change-generator.page-type.ts": bodyOf({
      id: idOf("3"),
      type: `${pageType.slug}/${pageType.slug}`,
      slug: changeGenerator.slug,
      extends: [MODULE_AT],
      properties: [],
    }),
    "akasha/making.change-generator.ts": bodyOf({
      id: idOf("4"),
      type: `${pageType.slug}/${changeGenerator.slug}`,
      slug: "making",
      code: "ts",
    }),
    "akasha/making.change-generator.code.ts": code,
  })
}

test("a file a change generator writes is written and named, whatever it could turn", () => {
  const root = world(MAKING)
  const said = turnedWhole(root, true)
  expect(said.refused).toEqual([])
  expect(said.added).toEqual([MADE_AT])
  expect(readFileSync(join(root, MADE_AT), "utf8")).toBe("made\n")

  const again = turnedWhole(root, false)
  expect(again.added).toEqual([])
  expect(again.changed).toEqual([])
})

test("a written file the pages no longer say is named and written again", () => {
  const root = world(MAKING)
  turnedWhole(root, true)
  const at = join(root, MADE_AT)
  writeFileSync(at, "nonsense\n")

  expect(turnedWhole(root, false).changed).toEqual([MADE_AT])
  expect(turnedWhole(root, true).changed).toEqual([MADE_AT])
  expect(readFileSync(at, "utf8")).toBe("made\n")
})

test("a change generator that breaks is refused rather than answered as nothing differing", () => {
  const root = world('export function generateChange() { throw new Error("no") }\n')
  const said = turnedWhole(root, false)

  expect(said.added).toEqual([])
  expect(said.refused.length).toBe(1)
  expect(said.refused[0]).toContain("broke — no")
})

test("a change generator answering to no `generateChange` is refused", () => {
  const root = world("export const nothing = 1\n")

  expect(turnedWhole(root, false).refused[0]).toContain("answers to no `generateChange`")
})
