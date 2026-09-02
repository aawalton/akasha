import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionSettings = {
  id: "01a060f9-bad9-750a-870e-3ac5edb4440c",
  pageTypeSlug: "module",
  slug: "dungeon-champion-settings",
  definition: "the settings panel a player opens with the slash command",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The two icons beside the icon-set dropdown are built once the panel exists.",
    },
    {
      invariantKind: "departure",
      statement: "The control types this panel needs are declared here rather than globally.",
    },
  ],
} as const satisfies Module
