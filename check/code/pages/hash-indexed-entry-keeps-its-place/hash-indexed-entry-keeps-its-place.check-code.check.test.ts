import { expect, test } from "bun:test"
import {
  markedBefore,
  refusalsOver,
  rowsWere,
} from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/hash-indexed-entry-keeps-its-place.check-code.check.code.ts"
import type { Marked } from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/hash-indexed-entry-keeps-its-place.check-code.decision.code.ts"
import type { Change } from "akasha/page/modules/change/change.module.code.ts"

const PAGE = "kit/kit.module.ts"

const CODE = "kit/kit.module.code.ts"

const PART = "part/part.module.code.ts"

const TABLE: Marked = { page: PAGE, name: "KITS", code: CODE }

const HELD =
  'import { PART } from "akasha/part/part.module.code.ts"\nconst KITS = { none: {}, ...PART }\n'

const PART_HELD = "export const PART = { axe: {}, bow: {} }\n"

const SKILL_TYPE = "skill/temper-skill.page-type.ts"

const ROWS: Marked = { page: SKILL_TYPE, name: "slug", code: null }

const SKILL_A = "skill/pages/a/a.temper-skill.ts"

const SKILL_B = "skill/pages/b/b.temper-skill.ts"

const SKILL_C = "skill/pages/c/c.temper-skill.ts"

const NONE: readonly string[] = []

function noRows(): readonly string[] {
  return NONE
}

const NO_ROWS = noRows

function bytes(text: string | null | undefined): Uint8Array | null {
  return text === undefined || text === null ? null : new TextEncoder().encode(text)
}

function changing(
  was: Readonly<Record<string, string>>,
  now: Readonly<Record<string, string | null>>
): Change {
  return {
    root: "/repo",
    changed: Object.keys(now),
    before: (path) => bytes(was[path]),
    after: (path) => bytes(path in now ? now[path] : was[path]),
  }
}

test("a planted reorder in a table spread in from another module is refused", () => {
  const over = changing(
    { [CODE]: HELD, [PART]: PART_HELD },
    { [PART]: "export const PART = { bow: {}, axe: {} }\n" }
  )
  const said = refusalsOver(over, [TABLE], NO_ROWS)
  expect(said.map((one) => one.path)).toEqual([CODE])
  expect(said[0]?.reason).toContain('"axe" moved from index 1 to index 2')
  expect(said[0]?.reason).toContain('"bow" moved from index 2 to index 1')
})

test("an entry appended at the end lands", () => {
  const over = changing(
    { [CODE]: HELD, [PART]: PART_HELD },
    { [PART]: "export const PART = { axe: {}, bow: {}, club: {} }\n" }
  )
  expect(refusalsOver(over, [TABLE], NO_ROWS)).toEqual([])
})

test("an entry taken out is refused", () => {
  const over = changing(
    { [CODE]: HELD, [PART]: PART_HELD },
    { [PART]: "export const PART = { bow: {} }\n" }
  )
  expect(refusalsOver(over, [TABLE], NO_ROWS)[0]?.reason).toContain(
    '"axe" was at index 1 and is gone'
  )
})

test("a table read through no file the change writes is not judged", () => {
  const over = changing({ [CODE]: 'const KITS = ["a"]\n' }, { "other/other.module.code.ts": "x" })
  expect(refusalsOver(over, [{ ...TABLE, code: "gone/gone.module.code.ts" }], NO_ROWS)).toEqual([])
})

test("the code of a table taken away is refused as unreadable", () => {
  const over = changing({ [CODE]: 'const KITS = ["a"]\n' }, { [CODE]: null })
  expect(refusalsOver(over, [TABLE], NO_ROWS)[0]?.reason).toContain("could not be read")
})

test("a mark the change takes off a page still holds that change", () => {
  const was = 'export const kit = { slug: "kit", code: "ts", hashIndexed: ["KITS"] }\n'
  const over = changing(
    { [PAGE]: was },
    { [PAGE]: 'export const kit = { slug: "kit", code: "ts" }\n' }
  )
  expect(markedBefore(over)).toEqual([TABLE])
})

test("a page added among a marked type's pages ahead of the end is refused", () => {
  const over = changing({ [SKILL_B]: "x", [SKILL_C]: "x" }, { [SKILL_A]: "x" })
  const said = refusalsOver(over, [ROWS], () => [SKILL_A, SKILL_B, SKILL_C])
  expect(said.map((one) => one.path)).toEqual([SKILL_TYPE])
  expect(said[0]?.reason).toContain('"b" moved from index 0 to index 1')
})

test("a page added among a marked type's pages at the end lands", () => {
  const over = changing({ [SKILL_A]: "x", [SKILL_B]: "x" }, { [SKILL_C]: "x" })
  expect(refusalsOver(over, [ROWS], () => [SKILL_A, SKILL_B, SKILL_C])).toEqual([])
})

test("the pages a type had are those there now less the added and with the taken", () => {
  const over = changing({ [SKILL_B]: "x", [SKILL_C]: "x" }, { [SKILL_A]: "x", [SKILL_C]: null })
  expect([...rowsWere(over, [SKILL_A, SKILL_B], "temper-skill")].sort()).toEqual([SKILL_B, SKILL_C])
})
