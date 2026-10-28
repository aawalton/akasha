import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const familyHistory = {
  id: "01a183ad-9231-7ec2-88b1-59b27c5bacdf",
  type: "page-type/record-property",
  slug: "family-history",
  propertySlug: "family-history",
  definition:
    "the illnesses known in a person's blood relatives, one relative and illness at a time",
  properties: [
    { pageProperty: "select-property/family-relative", required: true, many: false },
    { pageProperty: "text-property/family-condition", required: false, many: false },
    { pageProperty: "number-property/family-onset-age", required: false, many: false },
    { pageProperty: "number-property/family-death-age", required: false, many: false },
    { pageProperty: "text-property/family-history-note", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A relative with two illnesses has two entries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming no illness says that relative has no illness known.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An age nobody knows is left out rather than guessed.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-28T18:02:32.879Z",
  updatedAt: "2026-10-28T18:02:32.879Z",
} as const satisfies RecordProperty
