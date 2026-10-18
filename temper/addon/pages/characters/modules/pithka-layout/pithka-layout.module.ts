import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaLayout = {
  id: "01a0de90-70fd-7d31-93f6-5daeec7600ff",
  type: "page-type/module",
  slug: "pithka-layout",
  definition: "the rows and screens the achievement tracker lays its controls out in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tracker screen sits below the frame's divider, and the window grows to fit it.",
    },
  ],
  createdAt: "2026-09-26T16:33:23.197Z",
  updatedAt: "2026-10-18T20:10:13.287Z",
} as const satisfies Module
