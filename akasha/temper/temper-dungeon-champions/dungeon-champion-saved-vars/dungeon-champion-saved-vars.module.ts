import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const dungeonChampionSavedVars = {
  id: "01a060f9-bad8-7db9-82ae-dfa276bad382",
  pageTypeSlug: "module",
  slug: "dungeon-champion-saved-vars",
  definition: "the settings this addon keeps between sessions",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Settings once kept under a character name are moved to the account id once.",
    },
    {
      invariantKind: "gap",
      statement: "Reading the settings before the settings are brought up throws.",
    },
  ],
} as const satisfies Module
