import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const difficultyLevel = {
  id: "01a17edc-4473-7982-b658-4af62fb60d91",
  type: "page-type/page-type",
  slug: "difficulty-level",
  definition: "how hard a played story plays",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "difficulty level" },
    { partOfSpeech: "part-of-speech/noun", spelling: "difficulty levels" },
  ],
  pluralSlug: "difficulty-levels",
  extends: ["page-type/page"],
  parts: [
    "number-property/odds-modifier",
    "standard-agent-english-property/failure-ceiling",
    "standard-agent-english-property/game-master-stance",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/odds-modifier", required: true, many: false },
    {
      pageProperty: "standard-agent-english-property/failure-ceiling",
      required: true,
      many: false,
    },
    {
      pageProperty: "standard-agent-english-property/game-master-stance",
      required: true,
      many: true,
      maxCount: 5,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A difficulty level changes no reward.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The engine moves the roll, and no check's code reads the level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The levels are listed by their odds modifier, highest first.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T19:35:27.090Z",
  updatedAt: "2026-10-27T19:35:27.090Z",
} as const satisfies PageType
