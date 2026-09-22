import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const libSetsSetTextSetDataTextIndex = {
  id: "01a0623c-2df5-73ef-a197-343f411ab7d3",
  type: "page-type/module",
  slug: "lib-sets-set-text-set-data-text-index",
  definition: "the one call that turns a set's data into its tooltip text",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The parts breakdown is only filled when the text is not for a tooltip.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A set with no set id yields nothing but a complaint in the chat.",
    },
  ],
} as const satisfies Module
