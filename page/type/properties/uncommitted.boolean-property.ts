import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const uncommitted = {
  id: "01a04fc4-b988-7afd-89a2-9c87b0274410",
  type: "page-type/boolean-property",
  slug: "uncommitted",
  propertySlug: "uncommitted",
  definition: "whether the value a page has for this property stands outside the commit",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An uncommitted property is never required.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value the repository ignores is written without passing the write gate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An uncommitted value is asked for by the same query as any other value.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No query reading the repository's history reaches an uncommitted value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An uncommitted value goes when its page goes.",
    },
  ],
  types: "ts",
  createdAt: "2026-08-29T23:04:47.752Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies BooleanProperty
