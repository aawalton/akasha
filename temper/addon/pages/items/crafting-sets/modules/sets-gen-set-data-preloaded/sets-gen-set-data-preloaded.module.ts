import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsGenSetDataPreloaded = {
  id: "01a061dd-1562-75b4-97b2-c821be9c1a17",
  type: "page-type/module",
  slug: "sets-gen-set-data-preloaded",
  definition: "the whole preloaded set data record taken from the parts of its thirteen keys",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "Each key spreads its parts in source order so every array valued key keeps its order.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "Nothing checks that the parts of a key stay in source order once a part is moved.",
    },
  ],
  code: "ts",
} as const satisfies Module
