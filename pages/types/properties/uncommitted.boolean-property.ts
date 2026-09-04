import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type Uncommitted = boolean

export const uncommitted = {
  id: "01a04fc4-b988-7afd-89a2-9c87b0274410",
  pageTypeSlug: "boolean-property",
  slug: "uncommitted",
  propertySlug: "uncommitted",
  definition: "whether the value a page carries for this property stands outside the commit",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An uncommitted property is never required.",
    },
    {
      invariantKind: "departure",
      statement: "A value the repository ignores is written without passing the write gate.",
    },
    {
      invariantKind: "departure",
      statement: "An uncommitted value is asked for by the same query as any other value.",
    },
    {
      invariantKind: "absence",
      statement: "No query reading the repository's history reaches an uncommitted value.",
    },
    {
      invariantKind: "departure",
      statement: "An uncommitted value goes when its page goes.",
    },
  ],
} as const satisfies BooleanProperty
