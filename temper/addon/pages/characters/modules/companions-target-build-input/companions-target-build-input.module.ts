import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionsTargetBuildInput = {
  id: "01a0611d-84e6-77f3-8e05-8b4ff7570c86",
  type: "page-type/module",
  slug: "companions-target-build-input",
  definition: "the build hash a player is aiming a companion at",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A target build is kept per companion.",
    },
  ],
} as const satisfies Module
