import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const completionQuestProgress = {
  id: "01a06358-4f7c-7da0-b597-157cb4358528",
  pageTypeSlug: "module",
  slug: "completion-quest-progress",
  definition: "how many quests a character has finished, zone by zone and companion by companion",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The quest catalog arrives as an argument rather than as an imported table.",
    },
    {
      invariantKind: "departure",
      statement: "A quest a companion gives is left out of the zone reckoning.",
    },
    {
      invariantKind: "departure",
      statement: "A zone whose every quest belongs to a companion is left out.",
    },
    {
      invariantKind: "departure",
      statement: "The companion reckoning takes the quests from the companion quest module.",
    },
    {
      invariantKind: "constraint",
      statement: "A character read only for roster fields is skipped.",
    },
    {
      invariantKind: "constraint",
      statement: "An empty catalog answers an empty list.",
    },
  ],
} as const satisfies Module
