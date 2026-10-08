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
      statement: "A skill's heal type is cached for the companion catalogue it was read from.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An ultimate with no stated cost costs what the default ultimate cost page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Ground-targeted healing counts fully toward self healing and toward ally healing.",
    },
  ],
  createdAt: "2026-09-02T08:53:28.912Z",
  updatedAt: "2026-09-27T09:07:12.000Z",
} as const satisfies Module
