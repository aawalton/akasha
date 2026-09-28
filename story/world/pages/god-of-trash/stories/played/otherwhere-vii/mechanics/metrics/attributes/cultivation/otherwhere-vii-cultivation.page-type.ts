import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiCultivation = {
  id: "01a0ea36-990a-7bf9-a2bc-a08bfeb77bb7",
  type: "page-type/page-type",
  slug: "otherwhere-vii-cultivation",
  definition: "how far up the Tiers a character in Otherwhere VII has climbed, counted in steps",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The value counts steps climbed, and 0 is one who has never awakened to mana.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each Tier has four steps, low, mid, high and peak.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Steps 1 to 4 are Tier 0, Mana Gathering, and steps 5 to 8 Tier 1, Foundation Building.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Steps 9 to 12 are Tier 2, 13 to 16 Tier 3, and each four after the next Tier up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Awakening to mana sets the value to 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a step settled on the cultivating check raises the value past 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cracked core or a core torn out can lower the value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "No step shows as a number in the prose, though the System's status box names the Tier.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
