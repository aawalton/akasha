import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const otherwhereXiNotice = {
  id: "01a0ea80-e9b0-7ff9-9f8a-183e864a8aaa",
  type: "page-type/page-type",
  slug: "otherwhere-xi-notice",
  definition: "how much one god of Otherwhere XI has noticed a character, from nought to a hundred",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's slug ends in the god it measures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A god's page is filed when she first prays to, swears by or crosses that god.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Maradoc's page is filed from the first, since he set her down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice moves only as the notice check answers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At ten a god's shrine feels warm to her; at twenty-five omens and dreams come.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At fifty the god may answer: a vision, a sending, a voice or a small working.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At seventy-five the god may grant a blessing or title the interface shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Notice is not favour: a god who notices may meddle for its own ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every change is written on its page and a line of its history before the turn moves on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No notice shows as a number; it shows only as what the gods do.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
