import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIStamina = {
  id: "01a0ed2b-b8a2-7bb8-943b-93f23a2bbe86",
  type: "page-type/page-type",
  slug: "overwhere-i-stamina",
  definition: "the stamina a character in Overwhere I has left",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Most stamina is three for each point of Vigor, and three more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rise in most health, mana or stamina fills the new share at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sprint, a climb, a fight or a heavy lift spends stamina: one to five a scene.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At nought stamina every bodily act is a band harder until she rests.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A few minutes' rest gives back five; a night's sleep all of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in stamina is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stamina shows as a number save where her status shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
