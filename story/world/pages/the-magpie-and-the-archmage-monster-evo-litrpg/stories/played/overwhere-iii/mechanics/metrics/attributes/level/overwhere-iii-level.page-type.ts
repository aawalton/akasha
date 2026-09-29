import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiLevel = {
  id: "01a0ed27-2718-796e-9d0f-1392c68a60eb",
  type: "page-type/page-type",
  slug: "overwhere-iii-level",
  definition: "the System level a character in Overwhere III has reached",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala starts at Level 1, as a Human with no class.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Levels come only from the growth check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At Level 10 a human may take a class at a Guild's advancement stone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Village folk run Level 5 to 15, city guards 30 to 55, Order mages 35 to 45.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A Pillar is past Level 100, and a very few old mages past 150.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each level raises her most health by three and her own mana by two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System shows a level up as `[You've reached Level N.]`.",
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
