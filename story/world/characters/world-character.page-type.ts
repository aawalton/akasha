import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCharacter = {
  id: "01a0657a-9ccd-7153-9c9f-c9454abc1a22",
  type: "page-type/page-type",
  slug: "world-character",
  definition: "somebody a world's story follows",
  pluralSlug: "characters",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "module/character-filing",
    "number-property/event-count",
    "number-property/first-chapter",
    "number-property/last-chapter",
    "computed-property/max-level",
    "page-property-entry/character-claims",
    "relation-property/alias-of",
    "relation-property/merged-into",
    "text-property/claim-field",
    "text-property/claim-value",
    "text-property/claimed-by",
    "text-property/epistemic",
    "text-property/source-chapter",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "number-property/appearance-count", required: false, many: false },
    { pageProperty: "computed-property/max-level", required: false, many: false },
    { pageProperty: "number-property/event-count", required: false, many: false },
    { pageProperty: "number-property/first-chapter", required: false, many: false },
    { pageProperty: "number-property/last-chapter", required: false, many: false },
    { pageProperty: "page-property-entry/character-claims", required: false, many: false },
    { pageProperty: "relation-property/alias-of", required: false, many: false },
    { pageProperty: "relation-property/merged-into", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character belongs to one world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character is the story's account of that character rather than a player's creation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The words a character has are the story's rather than akasha's own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A world's character readings name the characters of that world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every level akasha holds for a character is a level claim beside that character.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
