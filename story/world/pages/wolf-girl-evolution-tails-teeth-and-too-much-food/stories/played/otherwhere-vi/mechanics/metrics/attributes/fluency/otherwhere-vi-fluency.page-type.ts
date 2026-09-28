import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereViFluency = {
  id: "01a0ea47-1666-7242-9f0c-51f6fc31878b",
  type: "page-type/page-type",
  slug: "otherwhere-vi-fluency",
  definition: "how well a character in Otherwhere VI understands one tongue, from nought to ten",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the tongue it measures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nala speaks and reads the common tongue as one born to it, and needs no page for it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Nought is no word; three is single words and gestures; six is plain talk; ten is native.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day spent among speakers who talk with her raises fluency one, up to six.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Past six, a week among speakers raises it one; a patient teacher halves the time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Her Intelligence of nine or more lets her keep what she hears the first time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Speech in a tongue below six is an act whose band rises as the fluency falls.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tongue's page is filed at nought when she first hears it spoken.",
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
