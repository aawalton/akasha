import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIiiPurse = {
  id: "01a0ed27-271a-7aec-88f6-717fe91fe028",
  type: "page-type/page-type",
  slug: "overwhere-iii-purse",
  definition: "the coin a character in Overwhere III holds, counted in copper",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Velithra coin is copper, silver and gold: a hundred copper to the silver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hundred silver make a gold, and one gold buys a strong horse.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A purse is counted in copper, so a silver is 100 and a gold 10,000.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala arrives with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An inn bed is 8 copper, a hot supper 3, boots 60, a plain dress and cloak 1 silver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day's hired labor pays 10 copper; a Copper quest 10 to 50; a Bronze quest 1 to 3 silver.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The Merrowgate blight bounty pays 1 silver for each blightstone handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A glimmerstone sells for 20 copper in a town and 30 in a city.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trader starts a haggle a third over the fair price, and meets in the middle.",
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
