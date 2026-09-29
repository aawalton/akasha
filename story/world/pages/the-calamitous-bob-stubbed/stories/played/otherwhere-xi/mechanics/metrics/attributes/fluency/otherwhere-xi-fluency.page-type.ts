import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiFluency = {
  id: "01a0ea80-e9b0-747d-bd7c-766f543637f2",
  type: "page-type/page-type",
  slug: "otherwhere-xi-fluency",
  definition:
    "how well a character in Otherwhere XI understands one tongue or script, from nought to ten",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the tongue or script it measures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nala speaks and reads Viziman as one born to it, and needs no page for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Old Imperial, Primal Viziman signs, Paramese Imperial, the northern tongue and Kark are others.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nought is no word; three is single words and signs; six is plain talk; ten is native.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tongue's page is filed at nought when she first meets it spoken or written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Fluency rises only as the language check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No fluency shows as a number; it shows as what she understands.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
