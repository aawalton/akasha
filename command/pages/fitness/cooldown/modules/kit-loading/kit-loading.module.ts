import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kitLoading = {
  id: "01a0b746-3ada-7ac2-849e-7cfce758883c",
  type: "page-type/module",
  slug: "kit-loading",
  definition: "what Alan has to load a movement with at a gym",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Kit Alan does not have to hand offers no loads.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The gym today's latest exercise set names is the gym Alan is at, else home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Today's latest exercise set is the one Alan performed at the latest instant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kit at a gym is the pieces that gym holds which are available.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gym holding every implement covers every implement a movement can name.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A gym no page names is refused rather than read as home.",
    },
  ],
  updatedAt: "2026-10-30T17:27:54.627Z",
  createdAt: "2026-09-19T01:27:08.250Z",
} as const satisfies Module
