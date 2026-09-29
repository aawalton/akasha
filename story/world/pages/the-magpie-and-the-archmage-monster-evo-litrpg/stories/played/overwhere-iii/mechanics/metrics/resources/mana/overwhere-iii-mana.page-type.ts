import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiMana = {
  id: "01a0ed27-271a-78c4-9bbd-8f7e7ad79285",
  type: "page-type/page-type",
  slug: "overwhere-iii-mana",
  definition: "the mana of their own a character in Overwhere III has left to spend",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's own mana is 10 at Level 1, and two more for each level after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Mana Weaver lends a working is the currents' mana, and is never kept here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A working spends the mana of her own its skill costs, whether it comes off or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Casting past her own mana is backlash: each point short costs two health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trained village mage has 15 to 30 mana; an Order mage far more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mana comes back two an hour at rest, and all of it after a night's sleep.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System names mana as Surging, Steady, Trickling or Drained, from full down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Mana never shows as a number; the prose shows it as warmth, tingle and fatigue.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
