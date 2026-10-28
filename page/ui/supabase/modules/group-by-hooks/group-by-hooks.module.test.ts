import { expect, test } from "bun:test"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import type { PropertyDefinition } from "akasha/page/core/modules/page-data/page-data.module.code.ts"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { GROUP_NONE_KEY } from "akasha/page/core/view/modules/apply-grouping-shared/apply-grouping-shared.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { bucketRowsByGroup } from "akasha/page/ui/supabase/modules/group-by-hooks/group-by-hooks.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const TARGET = "flower"
const ROSE = namedAs(TARGET, "rose", null)
const TULIP = namedAs(TARGET, "tulip", null)

const BEDS: PropertyDefinition = {
  id: "beds",
  title: "Beds",
  type: "text",
  fields: [
    { id: "bloom", title: "Bloom", type: "relation", config: { targetPageTypeSlug: TARGET } },
  ],
}

function garden(id: string, beds: Json): Page {
  return asPage({
    id,
    title: id,
    icon: null,
    slug: id,
    pageTypeId: "garden",
    pageTypeSlug: toPageTypeSlug("garden"),
    uniqueKey: null,
    beds,
  })
}

function bucketed(rows: readonly Page[]) {
  return bucketRowsByGroup({
    rows,
    groupPropertyId: "beds",
    isLoading: false,
    hasMore: false,
    properties: [BEDS],
  })
}

test("a row whose records name two pages sits in the group of each", () => {
  const groups = bucketed([
    garden("both", [{ bloom: ROSE }, { bloom: TULIP }]),
    garden("rose-only", [{ bloom: ROSE }]),
  ])
  expect([...groups.keys()]).toEqual([ROSE, TULIP])
  expect(groups.get(ROSE)?.pages.map((one) => one._id)).toEqual(["both", "rose-only"])
  expect(groups.get(TULIP)?.pages.map((one) => one._id)).toEqual(["both"])
})

test("a row whose records name no page sits under no value", () => {
  const groups = bucketed([garden("bare", [])])
  expect([...groups.keys()]).toEqual([GROUP_NONE_KEY])
})
