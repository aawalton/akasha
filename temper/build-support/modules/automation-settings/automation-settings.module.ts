import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const automationSettings = {
  id: "01a0609f-53f9-741e-ad0d-f6c482c8057e",
  type: "module",
  slug: "automation-settings",
  definition: "which chores are done for a character or companion without being asked for",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A toggle set on one character outranks the same toggle set across all characters.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A toggle set nowhere is off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A character has a toggle for each crafting writ the game gives out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A companion has fewer toggles than a character.",
    },
  ],
} as const satisfies Module
