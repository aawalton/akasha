import { expect, test } from "bun:test"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { relationShapesOf } from "akasha/page/ui/supabase/modules/hooks-view-query/hooks-view-query.module.code.ts"

const ALBUM = "shelf/first-shelf"

const OWNER = "keeper/first-keeper"

const OTHER_OWNER = "keeper/second-keeper"

const DEFINED: readonly PropertyDefinition[] = [
  { id: "albums", title: "Albums", type: "multi-relation", pageId: "one" },
  { id: "persona", title: "Persona", type: "relation", pageId: "two" },
  { id: "title", title: "Title", type: "text", pageId: "three" },
]

test("a view filtering on a many-valued relation asks only for the pages naming it", () => {
  expect(relationShapesOf("image", [{ key: "albums", includes: ALBUM }], DEFINED)).toEqual([
    {
      shapeKey: `image?where.albums=${ALBUM}`,
      pageTypeSlug: "image",
      named: { by: "where", key: "albums", values: [ALBUM] },
    },
  ])
})

test("a view filtering on a relation asks only for the pages naming it", () => {
  expect(relationShapesOf("image", [{ key: "persona", eq: OWNER }], DEFINED)[0]?.named).toEqual({
    by: "where",
    key: "persona",
    values: [OWNER],
  })
})

test("a view filtering on several related pages asks for each one apart", () => {
  const shapes = relationShapesOf("image", [{ key: "persona", in: [OWNER, OTHER_OWNER] }], DEFINED)
  expect(shapes.map((one) => one.named)).toEqual([
    { by: "where", key: "persona", values: [OWNER] },
    { by: "where", key: "persona", values: [OTHER_OWNER] },
  ])
})

test("a view filtering on very many related pages asks for them together", () => {
  const owners = Array.from({ length: 101 }, (_, at) => `keeper/keeper-${at}`)
  const shapes = relationShapesOf("image", [{ key: "persona", in: owners }], DEFINED)
  expect(shapes.map((one) => one.named)).toEqual([{ by: "where", key: "persona", values: owners }])
})

test("a view filtering on no relation asks for every page of its type", () => {
  expect(relationShapesOf("image", [{ key: "title", eq: "Mari" }], DEFINED)).toEqual([])
})
