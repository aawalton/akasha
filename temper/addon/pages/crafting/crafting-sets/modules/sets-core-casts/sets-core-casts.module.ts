import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreCasts = {
  id: "01a061fc-cee9-75c5-a75c-0036c8d4c7a8",
  type: "page-type/module",
  slug: "sets-core-casts",
  definition: "the narrowings for the slots and set-keyed tables hung on the library table",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The global's slots are reached by string key rather than by a declared field.",
    },
  ],
} as const satisfies Module
