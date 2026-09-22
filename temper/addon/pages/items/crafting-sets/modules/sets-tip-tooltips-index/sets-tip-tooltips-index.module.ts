import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsTipTooltipsIndex = {
  id: "01a0623c-2df7-7095-810c-642dbebff290",
  type: "page-type/module",
  slug: "sets-tip-tooltips-index",
  definition: "the load order of the tooltip modules",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The order these modules are loaded in is the order their effects happen.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The hook module loads after every module whose slots the hook module reads.",
    },
  ],
} as const satisfies Module
