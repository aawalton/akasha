import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export type TiClean = boolean

export const tiClean = {
  id: "01a0819e-2a48-7266-ba95-cc9be07ddbd5",
  pageTypeSlug: "boolean-property",
  type: "boolean-property",
  slug: "ti-clean",
  propertySlug: "ti-clean",
  definition: "whether an addon's TypeScript source has no raw table call",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A ti-clean addon has no `table.insert` and no `table.remove` call site in its TypeScript.",
    },
    {
      invariantKind: "departure",
      statement: "The `ti-clean-source-zero` ratchet keeps a ti-clean addon clean.",
    },
    {
      invariantKind: "departure",
      statement: "An addon saying nothing here is backlog rather than a violation.",
    },
  ],
} as const satisfies BooleanProperty
