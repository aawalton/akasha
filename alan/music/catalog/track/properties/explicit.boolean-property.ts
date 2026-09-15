import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const explicit = {
  id: "01a0a5e0-58f3-740e-9244-3bdebb7ceedb",
  type: "page-type/boolean-property",
  slug: "explicit",
  propertySlug: "explicit",
  definition: "whether a provider marks a recording as explicit",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "This is what the provider says rather than what a listener judges.",
    },
  ],
  types: "ts",
} as const satisfies BooleanProperty
