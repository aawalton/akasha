import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Title } from "../../pages/pages/properties/title.text-property.ts"
import type { UnitSlug } from "../collections/properties/unit-slug.relation-property.ts"
import type { CollectionTypeStatus } from "./properties/collection-type-status.select-property.ts"

export type CollectionType = Page & {
  title: Title
  unitSlug: UnitSlug
  collectionTypeStatus: CollectionTypeStatus
}

export const collectionType = {
  id: "01a0680f-6f00-7001-b374-6d2a9f5c6102",
  pageTypeSlug: "page-type",
  slug: "collection-type",
  definition: "a kind of thing collected, and what one of that kind is measured in",
  pluralSlug: "collection-types",
  extendsSlug: "page-type/page",
  partSlugs: ["select-property/collection-type-status"],
  properties: [
    { pagePropertySlug: "title", required: true, many: false },
    { pagePropertySlug: "unit-slug", required: true, many: false },
    { pagePropertySlug: "collection-type-status", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A collection takes its unit from its kind unless the collection states its own.",
    },
    {
      invariantKind: "departure",
      statement: "A kind is what a collection's `type` names.",
    },
    {
      invariantKind: "gap",
      statement:
        "Six thousand collections of these kinds stand outside akasha and have no page of their own.",
    },
  ],
} as const satisfies PageType
