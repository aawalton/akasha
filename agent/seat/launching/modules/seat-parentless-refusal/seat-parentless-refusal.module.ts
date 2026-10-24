import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatParentlessRefusal = {
  id: "01a0686d-9d5e-7014-b9a1-392193b1b6a8",
  type: "page-type/module",
  slug: "seat-parentless-refusal",
  definition: "the refusal of a seat that has no person and no parent",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that one person or several persons opened needs no parent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A seat working for the fleet and naming nobody above the seat is invisible to every tree walk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent stated as an empty string is no parent.",
    },
  ],
  createdAt: "2026-09-03T18:00:09.310Z",
  updatedAt: "2026-10-24T18:08:14.228Z",
} as const satisfies Module
