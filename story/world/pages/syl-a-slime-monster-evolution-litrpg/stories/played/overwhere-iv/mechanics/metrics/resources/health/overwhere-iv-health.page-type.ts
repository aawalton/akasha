import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIvHealth = {
  id: "01a0ed21-fffe-76e4-aafa-91667e2fd06f",
  type: "page-type/page-type",
  slug: "overwhere-iv-health",
  definition: "the health a character in Overwhere IV has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala's most health is 30 at Human LV 1, and five more for each racial level after.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A common beast or a townsman has 8 to 15; a seasoned fighter 20 to 40.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A monster has about its level times three, and a boss of its kind twice that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Health falls only as the harm check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An hour of rest gives back two; a night's sleep gives back ten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Healing magic or a healing potion gives back what its maker's skill allows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought a character is down: dead if the foe meant it, else out of the fight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Health never shows as a number; the prose shows it as pain, blood and weariness.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
