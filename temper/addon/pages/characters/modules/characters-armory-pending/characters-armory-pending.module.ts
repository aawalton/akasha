import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersArmoryPending = {
  id: "01a198d0-b1ad-7f9a-9c3e-8caf0dfcd0a0",
  type: "page-type/module",
  slug: "characters-armory-pending",
  definition: "the builds changed in the game's Temper Armory and not yet read back landed",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build shows the latest change made to it in the game while that change is pending.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pending change is dropped once its build is read back holding that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pending change is dropped and named once its build is read back changed by alanwalton.com.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build saved as new shows from the moment it is saved.",
    },
  ],
  createdAt: "2026-11-01T20:32:56.237Z",
  updatedAt: "2026-11-01T20:32:56.237Z",
} as const satisfies Module
