import type { PageType } from "@akasha/pages/page-type"

export const world = {
  id: "01a063ce-6216-7000-8f40-f471a7c21987",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world",
  definition: "a made-up somewhere",
  pluralSlug: "worlds",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "page-property-entry/character-readings",
    "page-property-entry/mechanic-readings",
    "text-property/character-slug",
    "text-property/mechanic-slug",
    "text-property/reading-kind",
    "text-property/reading-name",
    "text-property/reading-slug",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "page-property-entry/character-readings", required: false, many: false },
    { pageProperty: "page-property-entry/mechanic-readings", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A world states a reading property only where the world has rows under that property.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading says the thing one name in the text reaches rather than the nature of that thing.",
    },
    {
      invariantKind: "departure",
      statement: "The words a world has are the story's rather than akasha's own.",
    },
    {
      invariantKind: "gap",
      statement: "Every story names the world the story is of.",
    },
  ],
  types: "ts",
} as const satisfies PageType
