import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type MarkReadOnEnd = boolean

export const markReadOnEnd = {
  id: "01a0683a-620a-702a-911f-7f996e1b3876",
  pageTypeSlug: "boolean-property",
  slug: "mark-read-on-end",
  propertySlug: "mark-read-on-end",
  definition: "whether coming to the end of a page records that page as read",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page recorded as read at its end is recorded as read to its whole length.",
    },
    {
      invariantKind: "departure",
      statement: "A page already recorded as read is left as it stands.",
    },
  ],
} as const satisfies BooleanProperty
