import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkboxBadge = {
  id: "01a05b55-a539-7020-9439-1dd90c12e682",
  type: "page-type/module",
  slug: "checkbox-badge",
  definition: "a badge with a box that is ticked or not",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A box drawn bare starts on the edge every other bare value starts on.",
    },
  ],
} as const satisfies Module
