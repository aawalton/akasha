import { expect, test } from "bun:test"
import { folderFrom } from "akasha/check/code/pages/folder-matches-a-shape/folder-matches-a-shape.check-code.decision.test-fixtures.ts"
import type { Standing } from "akasha/check/code/pages/folder-matches-a-shape/folder-shape/folder-shape.page-type.ts"
import {
  judgedBy,
  type Loading,
  namesHeldBy,
  type Shape,
  shapesIn,
} from "akasha/check/code/pages/folder-matches-a-shape/modules/shape-loading/shape-loading.module.code.ts"
import { changing } from "akasha/code/body/modules/body-loading/body-loading.module.test-fixtures.ts"

const SHAPES = "check/code/pages/folder-matches-a-shape/folder-shape"

const ADDED_AT = `${SHAPES}/a-shape-added/a-shape-added.folder-shape.ts`

const ADDED_CODE_AT = `${SHAPES}/a-shape-added/a-shape-added.folder-shape.code.ts`

const ADDED_PAGE =
  'export const aShapeAdded = {\n  type: "page-type/folder-shape",\n  slug: "a-shape-added",\n  enabled: true,\n} as const\n'

const ADDED_CODE =
  "export function aShapeAdded(given: { readonly folder: string }): readonly string[] {\n" +
  '  return given.folder.endsWith("/kept") ? [] : ["it is not kept"]\n' +
  "}\n"

const KEPT_AT = `${SHAPES}/modules-only/modules-only.folder-shape.ts`

function listing(paths: readonly string[]): Loading {
  return {
    index: { everyOfType: () => paths.map((path) => ({ path, id: path })) },
    pageOf: () => ({ enabled: true }),
  }
}

function standingAt(folder: string): Standing {
  return folderFrom({ folder, pageTypes: new Set<string>() })([])
}

const TAKING: Shape = { slug: "modules-only", judge: () => [], holds: ["modules", ".server"] }

const ANY: Shape = { slug: "a-domain-with-its-parts", judge: () => [], holds: null }

test("a shape is handed a folder of the name that shape publishes", () => {
  expect(judgedBy(TAKING, standingAt("akasha/foo/modules"))).toEqual([])
})

test("a shape is handed a folder of any other name that shape publishes", () => {
  expect(judgedBy(TAKING, standingAt("akasha/foo/.server"))).toEqual([])
})

test("a folder of another name is declined with a reason rather than matched", () => {
  const said = judgedBy(TAKING, standingAt("akasha/foo/other"))
  expect(said).toHaveLength(1)
  expect(said[0]).toBe("it is named `other` rather than `modules` or `.server`")
})

test("a shape publishing no name is handed every folder", () => {
  expect(judgedBy(ANY, standingAt("akasha/foo/other"))).toEqual([])
})

test("the names held are the names the shapes publish", () => {
  expect([...namesHeldBy([TAKING, ANY])]).toEqual(["modules", ".server"])
})

test("a shape a change adds with its code is loaded and judges in that change", () => {
  const change = changing({ [ADDED_AT]: ADDED_PAGE, [ADDED_CODE_AT]: ADDED_CODE })
  const [shape, ...rest] = shapesIn(change, listing([ADDED_AT]))
  expect(rest).toEqual([])
  expect(shape?.slug).toBe("a-shape-added")
  if (shape === undefined) return
  expect(judgedBy(shape, standingAt("akasha/foo/kept"))).toEqual([])
  expect(judgedBy(shape, standingAt("akasha/foo/other"))).toEqual(["it is not kept"])
})

test("a shape whose code the change carries nothing of is loaded off the checkout", () => {
  const [shape] = shapesIn(changing({}), listing([KEPT_AT]))
  expect(shape?.slug).toBe("modules-only")
  expect(typeof shape?.judge).toBe("function")
})
