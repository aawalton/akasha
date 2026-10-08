import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingInit = {
  id: "01a06129-7a21-7e7a-a425-6b5004f48456",
  type: "page-type/module",
  slug: "housing-init",
  definition: "opening saved variables and building the housing window as the add-on loads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The window is built as the add-on loads rather than when first shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Saved variables missing a field take the field's default.",
    },
  ],
  createdAt: "2026-09-02T08:08:23.329Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
