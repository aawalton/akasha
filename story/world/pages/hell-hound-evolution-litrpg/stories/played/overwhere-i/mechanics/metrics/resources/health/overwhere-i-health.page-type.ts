import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIHealth = {
  id: "01a0ed2b-b8a1-7446-8fc6-e724a5aa4a03",
  type: "page-type/page-type",
  slug: "overwhere-i-health",
  definition: "the health a character in Overwhere I has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Harm is taken from health only as the harm check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala's most health is forty at level one, and rises by five each level.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ordinary beast has 10 to 40 health; an ordinary fighter 30 to 60.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A foe is filed as a character with a health page of its own before it is hurt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ordinary foe never takes Nala below one health.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Anyone else at nought is down and dying, and dies within the hour untended.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A third of most health lost to one blow leaves a wound that lasts until healed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An hour of rest gives back a tenth of most health; a night's sleep gives back half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A healer's care or a potion gives back what its own page says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in health is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No health shows as a number save where her status shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
