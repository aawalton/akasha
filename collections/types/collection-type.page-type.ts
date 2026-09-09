import type { Page } from "@akasha/pages/page"
import type { PageType } from "@akasha/pages/page-type"
import type { Title } from "../../pages/properties/title.text-property.ts"
import type { CollectionUnit } from "../properties/collection-unit.relation-property.ts"
import type { CollectionTypeStatus } from "./properties/collection-type-status.select-property.ts"

export type CollectionType = Page & {
  title: Title
  unit: CollectionUnit
  collectionTypeStatus: CollectionTypeStatus
}

export const collectionType = {
  id: "01a0680f-6f00-7001-b374-6d2a9f5c6102",
  pageTypeSlug: "page-type",
  slug: "collection-type",
  definition: "a kind of thing collected, and what one of that kind is measured in",
  pluralSlug: "collection-types",
  extends: ["page-type/page"],
  parts: ["select-property/collection-type-status"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/collection-unit", required: true, many: false },
    { pageProperty: "select-property/collection-type-status", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection takes its unit from its kind unless the collection states its own.",
    },
    {
      invariantKind: "departure",
      statement: "A collection's `type` names the kind.",
    },
    {
      invariantKind: "gap",
      statement:
        "Six thousand collections of these kinds sit outside akasha and have no page of their own.",
    },
  ],
} as const satisfies PageType
