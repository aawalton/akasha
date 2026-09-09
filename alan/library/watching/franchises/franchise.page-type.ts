import type { PageType } from "@akasha/pages/page-type"
import type { CollectionExternal } from "../../../../collections/externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/properties/title.text-property.ts"

export type Franchise = CollectionExternal & {
  title: Title
}

export const franchise = {
  id: "01a06599-ee09-7001-9283-02195311fb0e",
  pageTypeSlug: "page-type",
  slug: "franchise",
  definition: "the shows and films that share one world",
  pluralSlug: "franchises",
  extends: ["page-type/collection-external"],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A franchise has a name and the provider the name was read from.",
    },
    {
      invariantKind: "departure",
      statement: "A franchise the provider gives no id to leaves the id unstated.",
    },
  ],
} as const satisfies PageType
