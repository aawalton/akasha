import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsTargetBuildInput = {
  id: "01a0611d-84e6-77f3-8e05-8b4ff7570c86",
  type: "page-type/module",
  slug: "companions-target-build-input",
  definition: "the target build hash a player sets for a companion",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target build is kept per companion.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.654Z",
  updatedAt: "2026-09-22T14:12:28.000Z",
} as const satisfies Module
