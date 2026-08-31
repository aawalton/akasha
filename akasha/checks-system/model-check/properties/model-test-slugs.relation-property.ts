import type { Slug } from "../../../pages-system/page/properties/slug.text-property.ts"
import type { List } from "../../../pages-system/page-property/page-property.page-type.ts"
import type { RelationProperty } from "../../../pages-system/relation-property/relation-property.page-type.ts"

export type ModelTestSlugs = List<Slug>

export const modelTestSlugs = {
  id: "01a05911-aa17-7af6-9941-6715a1205f25",
  pageTypeSlug: "relation-property",
  slug: "model-test-slugs",
  propertySlug: "model-test-slugs",
  definition: "the tests a check puts to a model, in the order they are run",
  targetPageTypeSlug: "page-type/model-test",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One check holds the tests that judge one thing from different sides.",
    },
  ],
} as const satisfies RelationProperty
