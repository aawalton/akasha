import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const progressPropertyBadge = {
  id: "01a0620f-82c5-700e-8442-3316875e400c",
  type: "page-type/module",
  slug: "progress-property-badge",
  definition: "The badge for a progress property, showing how far along its entries are.",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry stating no label of its own is drawn by titling its own key.",
    },
  ],
} as const satisfies Module
