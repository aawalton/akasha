import { afterAll, expect, test } from "bun:test"
import {
  keyedAnew,
  landedName,
  pagesMoved,
  typeMoved,
} from "akasha/changes/modules/page-type-renaming/page-type-renaming.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { repoWorld } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import { faultSaid, parsedAs } from "akasha/code/source/code-source.module.code.ts"
import {
  aType,
  bodyOf,
  idOf,
  pageOf,
  scratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const WAS = "widget"

const TO = "gadget"

const TYPE_AT = "akasha/widget.page-type.ts"

const PAGE_AT = "akasha/widgets/one.widget.ts"

const PAGE_CODE = "akasha/widgets/one.widget.code.ts"

const NAMER_AT = "akasha/wider/wider.module.code.ts"

const [, WIDGET_TYPE] = aType(idOf("d"), WAS, ["page-type/domain"], ["code"])

const HELD: Readonly<Record<string, string>> = {
  [TYPE_AT]: bodyOf(WIDGET_TYPE),
  [PAGE_AT]: pageOf({ id: idOf("e"), pageTypeSlug: WAS, slug: "one", code: "ts" }),
  [PAGE_CODE]: "export const one = 1\n",
  "akasha/wider/wider.module.ts": pageOf({
    id: idOf("f"),
    pageTypeSlug: "module",
    slug: "wider",
    definition: "a page naming what the rename carries",
    code: "ts",
  }),
  [NAMER_AT]: 'import { one } from "../widgets/one.widget.code.ts"\n\nexport const wider = one\n',
}

function worldHeld(): World {
  return repoWorld(HELD)
}

test("a page of the renamed type takes the new slug where the old slug named its type", () => {
  expect(landedName(PAGE_AT, WAS, TO, false)).toBe("akasha/widgets/one.gadget.ts")
})

test("a page type's own file takes the new slug where the old slug opened its name", () => {
  expect(landedName(TYPE_AT, WAS, TO, true)).toBe("akasha/gadget.page-type.ts")
})

test("a file naming the old slug nowhere is carried nowhere", () => {
  expect(landedName(NAMER_AT, WAS, TO, false)).toBe(null)
  expect(landedName(PAGE_AT, WAS, TO, true)).toBe(null)
})

test("every file a page claims is carried with that page", () => {
  const held = pagesMoved(worldHeld(), WAS, TO)
  if ("refused" in held) throw new Error(held.refused)

  expect(held.moved.get(PAGE_AT)).toBe("akasha/widgets/one.gadget.ts")
  expect(held.moved.get(PAGE_CODE)).toBe("akasha/widgets/one.gadget.code.ts")
  expect(held.paged).toEqual([{ at: PAGE_AT, lands: "akasha/widgets/one.gadget.ts" }])
})

test("a page type's own file is carried on its own", () => {
  const held = typeMoved(worldHeld(), TYPE_AT, TO)
  if ("refused" in held) throw new Error(held.refused)

  expect([...held.moved]).toEqual([[TYPE_AT, "akasha/gadget.page-type.ts"]])
})

test("a path naming no page type carries nothing", () => {
  expect(typeMoved(worldHeld(), PAGE_AT, TO)).toEqual({
    refused: "`akasha/widgets/one.widget.ts` names no page type, so nothing is carried",
  })
})

test("a page stating its type under both keys has both keys restated", () => {
  const text = 'type: "widget"\npageTypeSlug: "widget"\n'

  expect(keyedAnew(text, PAGE_AT, WAS, TO)).toEqual([
    {
      kind: "replace",
      path: PAGE_AT,
      contentFrom: 'type: "widget"',
      contentTo: 'type: "gadget"',
    },
    {
      kind: "replace",
      path: PAGE_AT,
      contentFrom: 'pageTypeSlug: "widget"',
      contentTo: 'pageTypeSlug: "gadget"',
    },
  ])
})

test("a key the page does not state is left alone", () => {
  expect(keyedAnew('type: "widget"\n', PAGE_AT, WAS, TO).length).toBe(1)
})

test("a slug the source would not hold bare is written escaped", () => {
  expect(keyedAnew('type: "widget"\n', PAGE_AT, WAS, 'ga"dget')).toEqual([
    {
      kind: "replace",
      path: PAGE_AT,
      contentFrom: 'type: "widget"',
      contentTo: 'type: "ga\\"dget"',
    },
  ])
  expect(faultSaid(parsedAs(PAGE_AT, 'export const one = { type: "ga\\"dget" }\n'))).toBeNull()
})

test("an old slug the source would not hold bare is looked for escaped", () => {
  const text = 'type: "wid\\"get"\n'

  expect(keyedAnew(text, PAGE_AT, 'wid"get', TO)).toEqual([
    {
      kind: "replace",
      path: PAGE_AT,
      contentFrom: 'type: "wid\\"get"',
      contentTo: 'type: "gadget"',
    },
  ])
})
