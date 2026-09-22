import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRotationState = {
  id: "01a06152-c2d0-7500-91c7-dc74d3b1f9e3",
  type: "page-type/module",
  slug: "companion-rotation-state",
  definition: "the starting state of a simulated companion rotation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill's heal type is cached across calls in a module-level map.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An ultimate with no stated cost is treated as costing one hundred.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Ground-targeted healing counts fully toward self healing and toward ally healing.",
    },
  ],
} as const satisfies Module
