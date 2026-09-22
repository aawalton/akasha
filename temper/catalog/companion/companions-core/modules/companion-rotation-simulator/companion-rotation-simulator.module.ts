import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionRotationSimulator = {
  id: "01a06152-c2d0-754e-9a10-1c25777b3df1",
  type: "page-type/module",
  slug: "companion-rotation-simulator",
  definition: "the tick loop playing out a companion rotation",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Skills are tried in the order the caller gave rather than by a priority score.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A light attack fills any tick where no skill is ready.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Accumulated ultimate is capped at five hundred.",
    },
  ],
} as const satisfies Module
