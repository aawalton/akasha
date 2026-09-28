import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldCharacter = {
  id: "01a0657a-9ccd-7153-9c9f-c9454abc1a22",
  type: "page-type/page-type",
  slug: "world-character",
  definition: "somebody a world's story follows",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "character" },
    { partOfSpeech: "part-of-speech/noun", spelling: "characters" },
  ],
  pluralSlug: "characters",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "page-type/character-player",
    "page-type/character-other",
    "relation-property/character-story",
    "relation-property/character-place",
    "multi-relation-property/characters",
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
    "text-property/cover-description",
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
    { pageProperty: "text-property/cover-description", required: false, many: false },
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
    {
      decisionKind: "decision-kind/departure",
      statement: "What a place sets in the way of the one playing is the characters in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's cover is the image a play screen draws that character as.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
