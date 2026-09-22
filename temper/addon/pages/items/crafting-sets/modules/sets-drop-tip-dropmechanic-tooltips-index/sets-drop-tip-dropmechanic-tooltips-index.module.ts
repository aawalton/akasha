import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropTipDropmechanicTooltipsIndex = {
  id: "01a061d6-3e43-7f81-96b3-af30733ec6c4",
  type: "page-type/module",
  slug: "sets-drop-tip-dropmechanic-tooltips-index",
  definition: "an import that runs the drop mechanic tooltip install",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This file has a single import and declares nothing.",
    },
  ],
} as const satisfies Module
