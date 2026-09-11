import { afterAll, expect, test } from "bun:test"
import { renamePageTypePages } from "akasha/changes/mechanical/page-type/rename/rename-page-type-pages/rename-page-type-pages.change-mechanical-page-type.code.ts"
import { repoWorld } from "akasha/changes/modules/shadow/change-shadow.module.test-fixtures.ts"
import {
  aType,
  bodyOf,
  idOf,
  pageOf,
  scratch,
} from "akasha/pages/indexes/fixture-world/fixture-world.module.code.ts"

afterAll(scratch.sweep)

const TYPE_AT = "akasha/widget.page-type.ts"

const PAGE_AT = "akasha/widgets/one.widget.ts"

const PAGE_CODE = "akasha/widgets/one.widget.code.ts"

const NAMER_AT = "akasha/wider/wider.module.code.ts"

const [, WIDGET_TYPE] = aType(idOf("d"), "widget", ["page-type/domain"], ["code"])

const PAGE_BODY = `export const one = {
  id: "${idOf("e")}",
  pageTypeSlug: "widget",
  slug: "one",
  code: "ts",
} as const
`

const HELD: Readonly<Record<string, string>> = {
  [TYPE_AT]: bodyOf(WIDGET_TYPE),
  [PAGE_AT]: PAGE_BODY,
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

test("every page and every file a page claims is moved in one answer", () => {
  const said = renamePageTypePages(repoWorld(HELD), { at: TYPE_AT, to: "gadget" })

  expect(said.refused).toBe(null)
  expect(said.edits).toEqual([
    { kind: "move", pathFrom: PAGE_AT, pathTo: "akasha/widgets/one.gadget.ts" },
    { kind: "move", pathFrom: PAGE_CODE, pathTo: "akasha/widgets/one.gadget.code.ts" },
    {
      kind: "replace",
      path: NAMER_AT,
      contentFrom: 'import { one } from "../widgets/one.widget.code.ts"',
      contentTo: 'import { one } from "../widgets/one.gadget.code.ts"',
    },
    {
      kind: "replace",
      path: "akasha/widgets/one.gadget.ts",
      contentFrom: 'pageTypeSlug: "widget"',
      contentTo: 'pageTypeSlug: "gadget"',
    },
  ])
})

test("a path naming no page type is refused here", () => {
  const said = renamePageTypePages(repoWorld(HELD), { at: PAGE_AT, to: "gadget" })

  expect(said.refused).toBe(
    "`akasha/widgets/one.widget.ts` names no page type, so no page is renamed"
  )
})
