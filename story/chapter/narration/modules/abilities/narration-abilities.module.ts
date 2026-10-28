import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationAbilities = {
  id: "01a18359-bd3e-7d8b-8126-76f8fe423a1b",
  type: "page-type/module",
  slug: "narration-abilities",
  definition: "the abilities and stat groups of a story's world, as narration says its windows",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A world's skills, ability kinds and stat groups are asked for on each narration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no world is said with no abilities and no stat groups.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Stat groups the store refuses leave the abilities said as they would be.",
    },
  ],
  createdAt: "2026-10-28T16:30:58.877Z",
  updatedAt: "2026-10-28T16:30:58.877Z",
} as const satisfies Module
