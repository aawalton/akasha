import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const kiEpisode = {
  id: "01a06825-d0ec-79a7-aa75-2b13b1b20f22",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-episode",
  definition: "one instalment of a season Ki watches",
  pluralSlug: "ki-episodes",
  extends: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An episode of Ki's names the season that episode is part of.",
    },
    {
      invariantKind: "departure",
      statement:
        "An episode of Ki's states its season's number beside the season that episode names.",
    },
  ],
  types: "ts",
} as const satisfies PageType
