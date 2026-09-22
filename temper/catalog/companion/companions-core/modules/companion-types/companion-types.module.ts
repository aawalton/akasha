import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionTypes = {
  id: "01a06119-5cae-707d-b341-15cffa09f8ac",
  type: "page-type/module",
  slug: "companion-types",
  definition: "everything a saved companion build holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build names an equipped piece by slot rather than by a list of pieces.",
    },
  ],
} as const satisfies Module
