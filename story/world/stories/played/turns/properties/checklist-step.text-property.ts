import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const checklistStep = {
  id: "01a18e05-1f72-721a-ad6f-a039c80cd1e2",
  type: "page-type/text-property",
  slug: "checklist-step",
  propertySlug: "checklist-step",
  definition: "the step a one-seat turn's checklist is on",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The step is the item the checklist last served marks as the one to work now.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The step is named as the checklist names that item.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-30T18:14:22.833Z",
  updatedAt: "2026-10-30T18:14:22.833Z",
} as const satisfies TextProperty
