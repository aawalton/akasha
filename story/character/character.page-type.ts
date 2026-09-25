import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const character = {
  id: "01a0c9ee-9556-79b7-90b9-394c11c2cf2b",
  type: "page-type/page-type",
  slug: "character",
  definition: "someone a story happens to",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "character" },
    { partOfSpeech: "part-of-speech/noun", spelling: "characters" },
  ],
  pluralSlug: "characters",
  extends: ["page-type/page"],
  parts: [
    "relation-property/character-story",
    "relation-property/character-place",
    "page-type/character-player",
    "page-type/character-other",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/character-story", required: true, many: false },
    { pageProperty: "relation-property/character-place", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a place sets in the way of the one playing is the characters in it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
