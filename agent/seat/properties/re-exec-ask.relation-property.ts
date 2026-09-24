import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const reExecAsk = {
  id: "01a05810-00ac-7843-9198-1c1fed82fd40",
  type: "page-type/relation-property",
  slug: "re-exec-ask",
  propertySlug: "re-exec-ask",
  definition: "the standing of a seat's request to re-exec its supervisor",
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
} as const satisfies RelationProperty
