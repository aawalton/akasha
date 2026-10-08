import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionQolConstants = {
  id: "01a0611d-84c6-7e76-97f3-a24fa6b91e9a",
  type: "page-type/module",
  slug: "companion-qol-constants",
  definition: "the quality-of-life code's starting settings",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A setting absent from saved variables takes its value from here.",
    },
  ],
  createdAt: "2026-09-02T07:55:19.622Z",
  updatedAt: "2026-09-22T13:56:42.000Z",
} as const satisfies Module
