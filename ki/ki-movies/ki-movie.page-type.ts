import type { PageType } from "@akasha/pages-system/page-type"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiMovie = KiCollectionTemplate

export const kiMovie = {
  id: "01a06825-d0ec-7654-8084-1e099d039f38",
  pageTypeSlug: "page-type",
  slug: "ki-movie",
  definition: "a story Ki watches in one sitting",
  pluralSlug: "ki-movies",
  extendsSlug: "page-type/ki-collection-template",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movie of Ki's names the franchise it belongs to.",
    },
    {
      invariantKind: "departure",
      statement: "A movie of Ki's belongs to one franchise at most.",
    },
  ],
} as const satisfies PageType
