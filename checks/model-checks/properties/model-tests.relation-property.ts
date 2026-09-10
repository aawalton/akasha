import type { Slug } from "@akasha/pages/page/slug"
import type { List } from "@akasha/pages/page-property"
import type { RelationProperty } from "akasha/pages/relation-properties/relation-property.page-type.types.ts"

export type ModelTests = List<Slug>

export const modelTests = {
  id: "01a05911-aa17-7af6-9941-6715a1205f25",
  pageTypeSlug: "relation-property",
  type: "relation-property",
  slug: "model-tests",
  propertySlug: "model-tests",
  definition: "the tests a check puts to a model, in the order they are run",
  targetPageType: "page-type/model-test",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One check has the tests that judge one thing from different sides.",
    },
  ],
} as const satisfies RelationProperty
