import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldRank = {
  id: "01a0dedc-02c6-7d54-befb-802e0962a76b",
  type: "page-type/page-type",
  slug: "world-rank",
  definition: "a rung on a ladder a world has",
  pluralSlug: "ranks",
  extends: ["page-type/world-mechanic"],
  parts: [
    "number-property/world-rank-place",
    "page-type/character-rank",
    "page-type/cornerstone-depth",
    "page-type/cornerstone-wakefulness-tier",
    "page-type/the-beholder-tier",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "number-property/world-rank-place", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A ladder's rungs climb in the order their places rise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung's description says what reaching that rung means.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a rung takes to cross is the ladder's own property rather than this kind's.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
