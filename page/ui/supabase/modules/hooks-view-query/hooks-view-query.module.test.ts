import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { relationShapeOf } from "akasha/page/ui/supabase/modules/hooks-view-query/hooks-view-query.module.code.ts"

const ALBUM = "shelf/first-shelf"

const OWNER = "keeper/first-keeper"

const DEFINED: readonly PropertyDefinition[] = [
  { id: "albums", title: "Albums", type: "multi-relation", pageId: "one" },
  { id: "persona", title: "Persona", type: "relation", pageId: "two" },
  { id: "title", title: "Title", type: "text", pageId: "three" },
]

test("a view filtering on a many-valued relation asks only for the pages naming it", () => {
  expect(relationShapeOf("image", [{ key: "albums", includes: ALBUM }], DEFINED)).toEqual({
    shapeKey: `image?where.albums=${ALBUM}`,
    pageTypeSlug: "image",
    named: { by: "where", key: "albums", values: [ALBUM] },
  })
})

test("a view filtering on a relation asks only for the pages naming it", () => {
  expect(relationShapeOf("image", [{ key: "persona", eq: OWNER }], DEFINED)?.named).toEqual({
    by: "where",
    key: "persona",
    values: [OWNER],
  })
})

test("a view filtering on no relation asks for every page of its type", () => {
  expect(relationShapeOf("image", [{ key: "title", eq: "Mari" }], DEFINED)).toBe(undefined)
})
