import type { PageType } from "@akasha/pages/page-type"

export const episode = {
  id: "01a06599-ee09-7004-a115-2ffdedceb64a",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "episode",
  definition: "one instalment of a season",
  pluralSlug: "episodes",
  extends: ["page-type/collection-external"],
  parts: ["select-property/episode-type", "text-property/still-path"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/episode-type", required: false, many: false },
    { pageProperty: "text-property/still-path", required: false, many: false },
    { pageProperty: "number-property/vote-average", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An episode is watched or not.",
    },
    {
      invariantKind: "departure",
      statement: "An episode's season number is read from the season the episode is part of.",
    },
    {
      invariantKind: "departure",
      statement: "An episode's number is its position among the episodes of its season.",
    },
    {
      invariantKind: "departure",
      statement: "An episode states the minutes the episode runs to.",
    },
  ],
  types: "ts",
} as const satisfies PageType
