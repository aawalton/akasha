import type { PageType } from "@akasha/pages-system/page-type"
import type { CollectionExternal } from "../../../../collection-system/collection-externals/collection-external.page-type.ts"
import type { Title } from "../../../../pages/pages/properties/title.text-property.ts"

export type Franchise = CollectionExternal & {
  title: Title
}

export const franchise = {
  id: "01a06599-ee09-7001-9283-02195311fb0e",
  pageTypeSlug: "page-type",
  slug: "franchise",
  definition: "the shows and films that share one world",
  pluralSlug: "franchises",
  extendsSlug: "page-type/collection-external",
  properties: [{ pagePropertySlug: "title", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A franchise holds a name and the provider the name was read from.",
    },
    {
      invariantKind: "departure",
      statement: "A franchise the provider gives no id to leaves the id unstated.",
    },
  ],
} as const satisfies PageType
