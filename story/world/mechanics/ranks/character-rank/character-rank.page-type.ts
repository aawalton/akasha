import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const characterRank = {
  id: "01a10362-78a2-7494-92b0-5b5472ced524",
  type: "page-type/page-type",
  slug: "character-rank",
  definition: "the rank one character holds, as a holding of the world's ranks",
  pluralSlug: "ranks-held",
  extends: ["page-type/world-rank"],
  parts: ["relation-property/rank-character", "relation-property/held-rank"],
  properties: [
    { pageProperty: "relation-property/rank-character", required: true, many: false },
    { pageProperty: "relation-property/held-rank", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's ranks held are pages of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding's slug is its character's slug, then the rank it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding states the title and place of the rank it names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
