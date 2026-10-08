import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterCaptureFoodMap = {
  id: "01a0616b-a193-7b4e-8eda-59845fbc07d4",
  type: "page-type/module",
  slug: "character-capture-food-map",
  definition: "each food and drink buff's ability id against its place in a build hash",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A place in this table is the number a saved build hash has.",
    },
  ],
  createdAt: "2026-09-02T09:20:38.803Z",
  updatedAt: "2026-09-21T15:13:00.000Z",
} as const satisfies Module
