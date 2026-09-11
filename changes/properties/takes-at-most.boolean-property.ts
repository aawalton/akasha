import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const takesAtMost = {
  id: "01a091db-ef1e-7d59-82ae-b2fbcb028c53",
  type: "boolean-property",
  slug: "takes-at-most",
  propertySlug: "takes-at-most",
  definition: "whether a change takes a ceiling on how many pages one run acts on",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change saying nothing here acts on every page that change reaches.",
    },
    {
      invariantKind: "departure",
      statement: "A change saying true takes that ceiling under `at-most`.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no ceiling acts on every page the change reaches.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
