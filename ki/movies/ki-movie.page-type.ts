import type { PageType } from "@akasha/pages/page-type"

export const kiMovie = {
  id: "01a06825-d0ec-7654-8084-1e099d039f38",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-movie",
  definition: "a story Ki watches in one sitting",
  pluralSlug: "ki-movies",
  extends: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A movie of Ki's names the franchise that movie belongs to.",
    },
    {
      invariantKind: "departure",
      statement: "A movie of Ki's belongs to one franchise at most.",
    },
  ],
  types: "ts",
} as const satisfies PageType
