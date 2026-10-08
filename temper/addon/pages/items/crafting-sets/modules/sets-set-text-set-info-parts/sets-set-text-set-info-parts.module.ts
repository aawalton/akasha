import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsSetTextSetInfoParts = {
  id: "01a06231-8f1f-7c5c-ab56-4aa95a3697c8",
  type: "page-type/module",
  slug: "sets-set-text-set-info-parts",
  definition: "the set's text broken into named parts with their raw data beside each",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each part has a flag saying whether the part has content.",
    },
  ],
  createdAt: "2026-09-02T12:56:50.207Z",
  updatedAt: "2026-09-22T03:24:53.000Z",
} as const satisfies Module
