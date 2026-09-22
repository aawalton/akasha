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
} as const satisfies Module
