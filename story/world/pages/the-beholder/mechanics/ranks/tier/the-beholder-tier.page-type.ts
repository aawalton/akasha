import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const theBeholderTier = {
  id: "01a0deed-aa86-70a1-94ba-361ba920f093",
  type: "page-type/page-type",
  slug: "the-beholder-tier",
  definition:
    "a tier of prey in The Beholder, told by whether and how strongly the prey is powered",
  pluralSlug: "ranks",
  extends: ["page-type/world-rank"],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No tier is told by a level, since the world has no levels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The world's class-letters are this ladder without its numbers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ladder has five tiers and no sixth.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
