import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type OnCall = boolean

export const onCall = {
  id: "01a0539b-d9f2-7d0c-80d9-1eabbdc9ec3e",
  pageTypeSlug: "boolean-property",
  slug: "on-call",
  propertySlug: "on-call",
  definition: "whether this stands ready for work sent to it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What is not on call states false.",
    },
    {
      invariantKind: "departure",
      statement: "A page cleared of this is refused.",
    },
  ],
} as const satisfies BooleanProperty
