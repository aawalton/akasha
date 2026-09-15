import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const offlineTextCache = {
  id: "01a0655d-daab-74e1-ab68-7d53cf730d46",
  type: "module",
  slug: "offline-text-cache",
  definition: "the shape a reading position is held in on the device",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing writes an index of the chapters the device holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A position store under the older shape carries fractions forward as progress.",
    },
  ],
} as const satisfies Module
