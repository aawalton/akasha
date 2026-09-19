import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const kitLoading = {
  id: "01a0b746-3ada-7ac2-849e-7cfce758883c",
  type: "page-type/module",
  slug: "kit-loading",
  definition: "what Alan has to load a movement with, and the loads it offers",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Kit Alan does not have to hand offers no loads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A load asked for by a target is the heaviest load at or under that target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target under every load Alan owns is answered with the lightest he owns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A warmup is a share of the working weight taken for a count of easy reps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A movement carrying no load is warmed up by its reps alone.",
    },
  ],
} as const satisfies Module
