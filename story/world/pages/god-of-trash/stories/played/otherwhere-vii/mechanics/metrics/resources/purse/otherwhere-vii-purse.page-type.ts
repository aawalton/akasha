import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViiPurse = {
  id: "01a0ea34-e453-75f3-b6bf-b3b7ba2f47a9",
  type: "page-type/page-type",
  slug: "otherwhere-vii-purse",
  definition: "the money a character in Otherwhere VII carries, counted in copper pennies",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is counted in copper pennies.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hundred pennies make a silver, and ten silvers a gold, so a gold is a thousand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Spirit stones pass among mages across the sea and are not counted in a purse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A price is the lore's market price, and bargaining for less is an action check.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change in money is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No sum shows as a number unless coins are counted in the scene.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
