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
  createdAt: "2026-09-01T04:58:54.649Z",
  updatedAt: "2026-09-24T20:21:40.000Z",
} as const satisfies Module
