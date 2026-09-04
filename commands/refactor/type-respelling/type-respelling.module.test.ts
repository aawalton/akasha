import { afterAll, expect, test } from "bun:test"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import type { Typing } from "@akasha/code-system/code-typing"
import { insideOf, typingOver } from "@akasha/code-system/code-typing"
import type { Shaped } from "@akasha/indexes/reaching"
import { scratchWorld } from "../../../command-system/scratching/scratching.module.code.ts"
import type { Renaming } from "../type-renaming/type-renaming.module.code.ts"
import { splicedIn } from "../type-renaming/type-renaming.module.code.ts"
import {
  addressedIn,
  bindingsOver,
  nameRespelled,
  nameSpelled,
  namesStill,
  pathRespelled,
  pathSpelled,
  readdressed,
  respelled,
} from "./type-respelling.module.code.ts"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function typed(said: Readonly<Record<string, string>>): { root: string; typing: Typing } {
  const root = scratch.rootFor("akasha-respelling-")
  for (const [path, text] of Object.entries(said)) {
    const at = join(root, path)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, text)
  }
  const typing = typingOver(root, Object.keys(said), (at) => {
    const rel = insideOf(root, at)
    if (rel !== null) return said[rel]
    try {
      return readFileSync(at, "utf8")
    } catch {
      return undefined
    }
  })
  return { root, typing }
}

const SEAT_ID = "01a0587c-0000-7000-8000-00000000000a"

const VERA_ID = "01a0587c-0000-7000-8000-00000000000b"

const TYPE_AT = "akasha/seat-system/seats/seat.page-type.ts"

const PAGE_AT = "akasha/seat-system/seats/pages/vera.seat.ts"

const ONE: Renaming = {
  id: SEAT_ID,
  path: TYPE_AT,
  was: "seat",
  now: "chair",
  wasPlural: "seats",
  plural: "chairs",
}

const KEYS: Record<string, string> = {
  partSlugs: "part-slugs",
  extendsSlug: "extends-slug",
  principalSeatName: "principal-seat-name",
  properties: "properties",
}

const AT: Record<string, Record<string, string>> = {
  "page-type": { seat: SEAT_ID },
  seat: { vera: VERA_ID },
}

const TARGETS: Record<string, string> = {
  "part-slugs": "page-type",
  "extends-slug": "page-type",
  "principal-seat-name": "seat",
}

const KNOWN: Shaped = {
  targetOf: (propertySlug) => TARGETS[propertySlug] ?? null,
  admitting: (target) => [target],
  at: (pageTypeSlug, slug) => {
    const id = AT[pageTypeSlug]?.[slug]
    return id === undefined ? [] : [{ path: `${slug}.${pageTypeSlug}.ts`, id }]
  },
  byId: () => null,
  fieldsOf: (propertySlug) => (propertySlug === "properties" ? ["principal-seat-name"] : []),
  slugOfKeyIn: (_value, key) => KEYS[key] ?? null,
  fieldOfKey: (_propertySlug, key) => KEYS[key] ?? null,
}

test("an address is found under the key stating it", () => {
  const value = { partSlugs: ["page-type/seat"], extendsSlug: "seat" }
  expect(addressedIn(value, KNOWN, SEAT_ID)).toEqual([
    { key: "partSlugs", named: "page-type/seat" },
    { key: "extendsSlug", named: "seat" },
  ])
})

test("a name nested in a record is found under the field stating it", () => {
  const value = { properties: [{ principalSeatName: "seat/vera" }] }
  expect(addressedIn(value, KNOWN, VERA_ID)).toEqual([
    { key: "principalSeatName", named: "seat/vera" },
  ])
})

test("the page type a page is states no address, a rename restating it by its key", () => {
  expect(addressedIn({ pageTypeSlug: "seat", slug: "vera" }, KNOWN, SEAT_ID)).toEqual([])
})

test("an address naming a page reaching somebody else is not this rename's", () => {
  expect(addressedIn({ extendsSlug: "page-type/seat" }, KNOWN, VERA_ID)).toEqual([])
})

test("an address to the page type is rewritten in the form it was written in", () => {
  expect(readdressed("page-type/seat", ONE, true)).toBe("page-type/chair")
  expect(readdressed("seat", ONE, true)).toBe("chair")
})

test("an address to a page of that type carries the type's slug as its prefix", () => {
  expect(readdressed("seat/vera", ONE, false)).toBe("chair/vera")
})

test("a bare address to a page of that type is left alone, its own slug not having changed", () => {
  expect(readdressed("vera", ONE, false)).toBe(null)
})

test("an address spelled as an id is left as it stands", () => {
  expect(readdressed(SEAT_ID, ONE, true)).toBe(null)
})

test("an address is rewritten where a relation states one rather than wherever the text matches", () => {
  const text =
    'export const held = {\n  pageTypeSlug: "seat",\n  partSlugs: ["seat"],\n} as const\n'
  const said = respelled(PAGE_AT, text, new Map([["seat", "chair"]]), new Set(["partSlugs"]))
  expect(said).toContain('pageTypeSlug: "seat"')
  expect(said).toContain('partSlugs: ["chair"]')
})

test("a name nested in a record is rewritten under the field stating it", () => {
  const text =
    'export const held = {\n  properties: [{ principalSeatName: "seat/vera" }],\n} as const\n'
  const said = respelled(
    PAGE_AT,
    text,
    new Map([["seat/vera", "chair/vera"]]),
    new Set(["principalSeatName"])
  )
  expect(said).toContain('principalSeatName: "chair/vera"')
})

test("nothing to respell leaves the body exactly as it stands", () => {
  const text = 'export const held = { partSlugs: ["seat"] } as const\n'
  expect(respelled(PAGE_AT, text, new Map(), new Set(["partSlugs"]))).toBe(text)
})

test("a slug standing between path marks is repointed", () => {
  expect(pathSpelled("akasha/checks-system/check/one.check.ts", "check", "code-check")).toBe(
    "akasha/checks-system/code-check/one.code-check.ts"
  )
  expect(pathSpelled("../../checks-system/check", "check", "code-check")).toBe(
    "../../checks-system/code-check"
  )
})

test("a slug standing alone is left, no path mark saying it is one", () => {
  expect(pathSpelled("check", "check", "code-check")).toBe(null)
})

test("a glob is a path, so the slug in one is repointed", () => {
  expect(pathSpelled("akasha/*.check.ts", "check", "code-check")).toBe("akasha/*.code-check.ts")
  expect(pathSpelled("akasha/admits.check*", "check", "code-check")).toBe(
    "akasha/admits.code-check*"
  )
})

test("a slug carrying the old one is no spelling of it", () => {
  expect(pathSpelled("akasha/checks-system/x", "check", "code-check")).toBe(null)
  expect(pathSpelled("akasha/code-check/x", "check", "code-check")).toBe(null)
})

test("a template's parts are repointed as a string's are", () => {
  const text = "const at = `akasha/${slug}.check.ts`\n"
  expect(pathRespelled("akasha/held.ts", text, "check", "code-check")).toBe(
    "const at = `akasha/${slug}.code-check.ts`\n"
  )
})

test("a name outside a literal is left, the walk reaching literals alone", () => {
  expect(pathRespelled("akasha/held.ts", "const check = 1\n", "check", "code-check")).toBe(null)
})

test("a body naming the slug nowhere is answered as nothing rather than as itself", () => {
  expect(pathRespelled("akasha/held.ts", "const one = 1\n", "check", "code-check")).toBe(null)
})

test("a name standing whole in a literal is respelled", () => {
  expect(nameSpelled("import { seatOf } from x", "seatOf", "chairAt")).toBe(
    "import { chairAt } from x"
  )
  expect(nameSpelled("  const oid = seatOf(root, path)", "seatOf", "chairAt")).toBe(
    "  const oid = chairAt(root, path)"
  )
})

test("a longer name carrying the renamed one is no spelling of it", () => {
  expect(nameSpelled("seatOfSomething", "seatOf", "chairAt")).toBe(null)
  expect(nameSpelled("heldseatOf", "seatOf", "chairAt")).toBe(null)
})

test("a name spelled inside a plain string is respelled", () => {
  const text = 'const said = "  const oid = seatOf(root, path)"\n'
  expect(nameRespelled("akasha/held.ts", text, "seatOf", "chairAt")).toBe(
    'const said = "  const oid = chairAt(root, path)"\n'
  )
})

test("a template's head and middle and tail are read for a name as a plain string is", () => {
  const text = "const at = `seatOf ${one} seatOf ${two} seatOf`\n"
  expect(nameRespelled("akasha/held.ts", text, "seatOf", "chairAt")).toBe(
    "const at = `chairAt ${one} chairAt ${two} chairAt`\n"
  )
})

test("a name outside a literal is left, the name walk reaching literals alone", () => {
  expect(nameRespelled("akasha/held.ts", "const seatOf = 1\n", "seatOf", "chairAt")).toBe(null)
})

test("a body naming the name nowhere is answered as nothing rather than as itself", () => {
  expect(nameRespelled("akasha/held.ts", "const one = 1\n", "seatOf", "chairAt")).toBe(null)
})

test("a spelling the rename cannot judge is named by the line it stands on", () => {
  expect(namesStill('const CHECKS = "check"\n', "check")).toEqual([1])
  expect(namesStill("one\ntwo\nconst at = check\n", "check")).toEqual([3])
})

test("a module named for the renamed type is named", () => {
  expect(namesStill("akasha/checks-system/check-scratch/x.ts", "check")).toEqual([1])
})

test("a longer name carrying the old slug is not named", () => {
  expect(namesStill("checks-system\nchecking\ncode-check\n", "check")).toEqual([])
})

const TYPE_BODY = 'export type Seat = { id: string }\nexport const seat = { id: "one" }\n'

test("a name imported from the page type's own file is renamed with it", () => {
  const page =
    'import type { Seat } from "../seat.page-type.ts"\n' +
    'export const vera = { id: "two" } as const satisfies Seat\n'
  const { root, typing } = typed({ [TYPE_AT]: TYPE_BODY, [PAGE_AT]: page })
  const spots = bindingsOver(typing, root, ONE).get(PAGE_AT) ?? []

  expect(splicedIn(page, spots)).toBe(
    'import type { Chair } from "../seat.page-type.ts"\n' +
      'export const vera = { id: "two" } as const satisfies Chair\n'
  )
})

test("the page type's own file is renamed throughout rather than through an import", () => {
  const { root, typing } = typed({ [TYPE_AT]: TYPE_BODY })
  const spots = bindingsOver(typing, root, ONE).get(TYPE_AT) ?? []

  expect(splicedIn(TYPE_BODY, spots)).toBe(
    'export type Chair = { id: string }\nexport const seat = { id: "one" }\n'
  )
})

test("a name shadowing an imported one inside a scope is left as it stands", () => {
  const page =
    'import { seat } from "../seat.page-type.ts"\n' +
    "export function firstOf(said: readonly { id: string }[]): string {\n" +
    "  const seat = said[0]\n" +
    '  return seat === undefined ? "" : seat.id\n' +
    "}\n" +
    "export function ownOf(): string {\n  return seat.id\n}\n"
  const { root, typing } = typed({ [TYPE_AT]: TYPE_BODY, [PAGE_AT]: page })
  const spots = bindingsOver(typing, root, ONE).get(PAGE_AT) ?? []
  const said = splicedIn(page, spots)

  expect(spots).toHaveLength(2)
  expect(said).toContain("  const seat = said[0]")
  expect(said).toContain('return seat === undefined ? "" : seat.id')
  expect(said).toContain('import { chair } from "../seat.page-type.ts"')
  expect(said).toContain("return chair.id")
})
