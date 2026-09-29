import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereIStat = {
  id: "01a0ed29-c6bd-7e4a-a925-f91c0eb8903d",
  type: "page-type/page-type",
  slug: "overwhere-i-stat",
  definition: "one of the stats the System keeps for a character in Overwhere I",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the stat it keeps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every being has Strength, Dexterity, Vigor and Attunement, and one racial stat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A human's racial stat is Luck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An untrained adult sits from 8 to 12 in each stat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat rises only as the growth check answers, or as an achievement grants.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The System shows a rise as a line such as +3 Attunement as it happens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No stat shows as a number save where her status or the System shows it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
