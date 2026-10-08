import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolState = {
  id: "01a0611d-84cd-766a-94cc-4f86cd3cfe46",
  type: "page-type/module",
  slug: "companion-qol-state",
  definition: "the holder of the companion quality-of-life code's settings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every quality-of-life module reads its settings from this one holder.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.629Z",
  updatedAt: "2026-09-22T13:50:05.000Z",
} as const satisfies Module
