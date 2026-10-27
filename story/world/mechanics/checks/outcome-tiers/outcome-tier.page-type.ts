import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const outcomeTier = {
  id: "01a17eee-80be-7a43-9453-3044d69c6ac8",
  type: "page-type/page-type",
  slug: "outcome-tier",
  definition: "how well an ability check came off",
  spellings: [
    { partOfSpeech: "part-of-speech/noun", spelling: "outcome tier" },
    { partOfSpeech: "part-of-speech/noun", spelling: "outcome tiers" },
  ],
  pluralSlug: "outcome-tiers",
  extends: ["page-type/page"],
  parts: [
    "number-property/score-floor",
    "boolean-property/succeeds",
    "standard-agent-english-property/writer-instruction",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/score-floor", required: false, many: false },
    { pageProperty: "boolean-property/succeeds", required: true, many: false },
    {
      pageProperty: "standard-agent-english-property/writer-instruction",
      required: true,
      many: false,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every ability check lands on exactly one outcome tier.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A score lands the tier with the highest floor at or below it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The one tier stating no floor takes every score below the lowest floor.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The outcome tiers are listed by their score floor, lowest first.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T19:55:22.173Z",
  updatedAt: "2026-10-27T19:55:22.173Z",
} as const satisfies PageType
