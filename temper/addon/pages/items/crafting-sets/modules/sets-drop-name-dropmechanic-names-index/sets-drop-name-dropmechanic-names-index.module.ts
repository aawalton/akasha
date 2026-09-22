import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsDropNameDropmechanicNamesIndex = {
  id: "01a061d6-3e2d-7671-9e8a-4f33f962730b",
  type: "page-type/module",
  slug: "sets-drop-name-dropmechanic-names-index",
  definition: "an import that runs the drop mechanic name install",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This file has a single import and declares nothing.",
    },
  ],
} as const satisfies Module
