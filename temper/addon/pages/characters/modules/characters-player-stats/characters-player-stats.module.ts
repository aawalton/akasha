import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersPlayerStats = {
  id: "01a062ed-3953-7006-94d1-870f11c3c3fc",
  type: "page-type/module",
  slug: "characters-player-stats",
  definition:
    "the name, build hash and curse of the character now played, read into the saved table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character the saved table does not yet hold is given a row rather than skipped.",
    },
  ],
  createdAt: "2026-09-02T16:21:49.011Z",
  updatedAt: "2026-09-21T17:05:12.000Z",
} as const satisfies Module
