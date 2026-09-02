import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionCardTaskProgress = {
  id: "01a0641c-83b4-7fba-b338-0d13a366420a",
  pageTypeSlug: "module",
  slug: "completion-card-task-progress",
  definition: "how far along one completion card is for one character, card by card",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A card counted its own way is answered here before the generic count is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A card only a daily task names is unmeasured.",
    },
    {
      invariantKind: "departure",
      statement: "A skill line a character cannot use is unmeasured for that character.",
    },
    {
      invariantKind: "departure",
      statement: "The antiquity-lore catalog is handed in rather than imported.",
    },
    {
      invariantKind: "gap",
      statement: "The antiquity-lore card is unanswered here.",
    },
  ],
} as const satisfies Module
