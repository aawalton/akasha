import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const reExecAsk = {
  id: "01a05810-00ac-7843-9198-1c1fed82fd40",
  type: "page-type/relation-property",
  slug: "re-exec-ask",
  propertySlug: "re-exec-ask",
  definition:
    "whether a supervisor reads the request of a seat that wants the supervisor restarted",
  targetPageType: "page-type/re-exec-ask-state",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask that has been taken up is kept rather than cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that has asked for nothing states nothing here.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-31T13:43:58.892Z",
  updatedAt: "2026-10-30T14:55:49.447Z",
} as const satisfies RelationProperty
