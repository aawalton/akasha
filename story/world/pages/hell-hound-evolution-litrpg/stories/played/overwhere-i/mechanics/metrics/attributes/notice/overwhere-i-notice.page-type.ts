import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const overwhereINotice = {
  id: "01a0ed2b-b8a1-72cd-a9b7-d4c8188428cc",
  type: "page-type/page-type",
  slug: "overwhere-i-notice",
  definition:
    "how far word of a character has reached one circle in Overwhere I, from nought to five",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the circle it measures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The circles are village, march, kingdom, verdant-empire, umarii and iron-march.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every circle's page is filed from her first day, at nought.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice moves only as the notice check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice is not favour: those who come looking may come for their own ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No notice shows as a number; it shows only as who comes looking.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
