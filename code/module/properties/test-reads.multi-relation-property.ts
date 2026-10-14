import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const testReads = {
  id: "01a13ba5-6102-7c21-9f1b-4c16ee451c5f",
  type: "page-type/multi-relation-property",
  slug: "test-reads",
  propertySlug: "test-reads",
  definition: "a page type whose pages a module's test reads without importing them",
  targetPageType: "page-type/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a page of a type named here runs the test of the module naming it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to a file beside such a page runs that test as well.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-14T18:20:56.449Z",
  updatedAt: "2026-10-14T18:20:56.449Z",
} as const satisfies MultiRelationProperty
