import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const uncommitted = {
  id: "01a04fc4-b988-7afd-89a2-9c87b0274410",
  type: "page-type/boolean-property",
  slug: "uncommitted",
  propertySlug: "uncommitted",
  definition: "whether the value a page has for this property stands outside the commit",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An uncommitted property is never required.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A value the repository ignores is written without passing the write gate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An uncommitted value is asked for by the same query as any other value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No query reading the repository's history reaches an uncommitted value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An uncommitted value goes when its page goes.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
