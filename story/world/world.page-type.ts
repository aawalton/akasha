import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const world = {
  id: "01a063ce-6216-7000-8f40-f471a7c21987",
  type: "page-type/page-type",
  slug: "world",
  definition: "a made-up somewhere",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "page-property-entry/character-readings",
    "page-property-entry/mechanic-readings",
    "select-property/reading-kind",
    "text-property/character-slug",
    "text-property/mechanic-slug",
    "text-property/reading-name",
    "text-property/reading-slug",
    "page-type/story-build",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "page-property-entry/character-readings", required: false, many: false },
    { pageProperty: "page-property-entry/mechanic-readings", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A world states a reading property only where the world has rows under that property.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reading says the thing one name in the text reaches rather than the nature of that thing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a world has are the story's rather than akasha's own.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every story names the world the story is of.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
