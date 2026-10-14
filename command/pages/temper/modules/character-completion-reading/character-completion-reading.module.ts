import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCompletionReading = {
  id: "01a13c20-c7d4-7bac-8767-53e8355f6ac8",
  type: "page-type/module",
  slug: "character-completion-reading",
  definition: "a character's completion read from beside that character's page",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A completion that does not parse as the completion record throws, naming why.",
    },
  ],
  createdAt: "2026-10-14T20:35:43.699Z",
  updatedAt: "2026-10-14T20:35:43.699Z",
} as const satisfies Module
