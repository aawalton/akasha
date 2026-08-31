import { expect, test } from "bun:test"
import type { Shaped } from "../../../../pages-system/indexes/reaching/reaching.module.code.ts"
import type { Renaming } from "../type-renaming/type-renaming.module.code.ts"
import {
  addressedIn,
  namesStill,
  pathRespelled,
  pathSpelled,
  readdressed,
  renamed,
  respelled,
} from "./type-respelling.module.code.ts"

const SEAT_ID = "01a0587c-0000-7000-8000-00000000000a"

const VERA_ID = "01a0587c-0000-7000-8000-00000000000b"

const TYPE_AT = "akasha/seat-system/seat/seat.page-type.ts"

const PAGE_AT = "akasha/seat-system/seat/seats/vera.seat.ts"

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
  slugOfKey: (key) => KEYS[key] ?? null,
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

test("a name imported from the page type's own file is renamed with it", () => {
  const text =
    'import type { Seat } from "../seat.page-type.ts"\n\n' +
    "export const vera = {} as const satisfies Seat\n"
  expect(renamed(PAGE_AT, text, "Seat", "Chair", TYPE_AT)).toBe(
    'import type { Chair } from "../seat.page-type.ts"\n\n' +
      "export const vera = {} as const satisfies Chair\n"
  )
})

test("a name imported under another name is renamed where it is imported and not where it is used", () => {
  const text =
    'import type { Seat as Held } from "../seat.page-type.ts"\n\n' +
    "export const vera = {} as const satisfies Held\n"
  const said = renamed(PAGE_AT, text, "Seat", "Chair", TYPE_AT)
  expect(said).toContain("{ Chair as Held }")
  expect(said).toContain("satisfies Held")
})

test("a file importing nothing from the page type's own file is left alone", () => {
  expect(renamed(PAGE_AT, "const Seat = 1\n", "Seat", "Chair", TYPE_AT)).toBe(null)
})

test("the page type's own file is renamed throughout rather than through an import", () => {
  const text = "export type Seat = Page & { one?: Seat }\n"
  expect(renamed(TYPE_AT, text, "Seat", "Chair", null)).toBe(
    "export type Chair = Page & { one?: Chair }\n"
  )
})

test("a key spelled like the name is no use of it", () => {
  const text =
    'import type { Seat } from "../seat.page-type.ts"\n' +
    "export const one = { Seat: 1 } as const satisfies Seat\n"
  const said = renamed(PAGE_AT, text, "Seat", "Chair", TYPE_AT)
  expect(said).toContain("{ Seat: 1 }")
  expect(said).toContain("satisfies Chair")
  expect(said).toContain("{ Chair }")
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
