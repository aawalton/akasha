import type { RelationProperty } from "akasha/page/relation-property/relation-property.page-type.types.ts"

export const spellingScope = {
  id: "01a0ca1d-8082-7959-89e4-11d944b578e3",
  type: "page-type/relation-property",
  slug: "spelling-scope",
  propertySlug: "scope",
  definition: "the domain whose pages read a spelling",
  targetPageType: "page-type/domain",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A spelling stating nothing here is read on every page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A spelling stating a scope is read on the pages whose slug opens with the scope's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page outside a scope names the term by a spelling that states no scope.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A term states a scoped spelling beside the full one rather than in place of it.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A page one scope reaches is a page no second scope of the same spelling reaches.",
    },
  ],
  types: "ts",
} as const satisfies RelationProperty
