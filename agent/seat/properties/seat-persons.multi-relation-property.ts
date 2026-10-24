import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const seatPersons = {
  id: "01a16ef7-be7e-7025-b52b-c3537c73ff26",
  type: "page-type/multi-relation-property",
  slug: "seat-persons",
  propertySlug: "persons",
  definition: "the persons a seat answers to",
  targetPageType: "page-type/person",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The persons a seat answers to and the work a seat answers for are two facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat assigned to a person states that person in two places.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat states one person, or several persons it serves together.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T17:31:32.350Z",
  updatedAt: "2026-10-24T17:31:32.350Z",
} as const satisfies MultiRelationProperty
