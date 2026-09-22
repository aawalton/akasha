import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolState = {
  id: "01a0611d-84cd-766a-94cc-4f86cd3cfe46",
  type: "page-type/module",
  slug: "companion-qol-state",
  definition: "the holder the companion quality-of-life code keeps its settings in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every quality-of-life module reads its settings from this one holder.",
    },
  ],
} as const satisfies Module
