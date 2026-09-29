import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiGlimmerstones = {
  id: "01a0ed27-2719-79b1-b773-b03a30a58835",
  type: "page-type/page-type",
  slug: "overwhere-iii-glimmerstones",
  definition: "the glimmerstones a character in Overwhere III holds in the System's keeping",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every monster has a glimmerstone at its core; a strong one may hold several.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A monster of Level 1 to 9 yields one, 10 to 19 two, 20 to 39 three, 40 and up five.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A glimmerstone taken up goes into the System's keeping and can be drawn out by will.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The skill shop sells skills, upgrades and advancements for glimmerstones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait or skill at its full potential goes to Rank 2 for 100 glimmerstones.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A corrupted beast yields blightstones instead, kept on their own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
