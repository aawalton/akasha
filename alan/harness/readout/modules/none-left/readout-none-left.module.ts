import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readoutNoneLeft = {
  id: "01a05b88-a4a3-76a2-abf1-db8351d2a5b7",
  type: "page-type/module",
  slug: "readout-none-left",
  definition: "the words and the emoji a readout shows in place of a zero",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each half is carried only where the page states that half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A half stating nothing but spaces is no half.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A half is carried with the spaces around the half trimmed off.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides when nothing is left.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here draws a ring.",
    },
  ],
  createdAt: "2026-09-01T05:54:36.835Z",
  updatedAt: "2026-10-30T16:24:28.470Z",
} as const satisfies Module
