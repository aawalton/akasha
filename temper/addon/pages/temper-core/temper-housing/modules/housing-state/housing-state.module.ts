import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingState = {
  id: "01a06113-b7d2-735f-8277-3ecbda9af951",
  type: "page-type/module",
  slug: "housing-state",
  definition: "the holder with the add-on's settings, running state and saved variables",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other module reaches this holder rather than importing a sibling module.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reading saved variables before the add-on opens the saved variables raises an error.",
    },
  ],
  createdAt: "2026-09-02T07:44:37.330Z",
  updatedAt: "2026-09-22T10:09:10.000Z",
} as const satisfies Module
