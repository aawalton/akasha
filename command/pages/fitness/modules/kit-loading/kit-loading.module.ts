import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kitLoading = {
  id: "01a0b746-3ada-7ac2-849e-7cfce758883c",
  type: "page-type/module",
  slug: "kit-loading",
  definition: "what Alan has to load a movement with at a gym, and the loads it offers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Kit Alan does not have to hand offers no loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The top load for a movement is the heaviest the kit covering it offers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The gym today's latest set names is the gym Alan is at, else home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Today's latest set is the one Alan performed at the latest instant.",
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
      statement: "A gym holding every implement offers no top load for any movement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next load up from a weight is the lightest load the kit lists above it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At a gym holding every implement, the next load up is 5 lb past the weight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step of 5 lb is the step between dumbbells or kettlebells in a rack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight is the load on one implement, so 5 lb past it is 5 lb on each.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Kit listing no load above a weight has no next load up from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A gym no page names is refused rather than read as home.",
    },
  ],
} as const satisfies Module
