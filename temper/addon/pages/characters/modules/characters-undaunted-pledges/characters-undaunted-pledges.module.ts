import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersUndauntedPledges = {
  id: "01a062ed-398d-7009-a4a9-bb8458c10c02",
  type: "page-type/module",
  slug: "characters-undaunted-pledges",
  definition: "today's undaunted pledges, less those already giving a character the point",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "A pledge on a dungeon one player cannot finish alone is not offered.",
    },
  ],
} as const satisfies Module
