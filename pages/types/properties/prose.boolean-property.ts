import type { BooleanProperty } from "../../boolean-properties/boolean-property.page-type.ts"

export type Prose = boolean

export const prose = {
  id: "01a07c84-1e12-78b2-833f-03ba5098eb58",
  pageTypeSlug: "boolean-property",
  slug: "prose",
  propertySlug: "prose",
  definition: "whether the values a property of a page type holds are prose",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page type saying nothing here is not yet decided.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating false holds no prose in any property of that page type.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record property's fields each answer for prose rather than the record answering.",
    },
  ],
} as const satisfies BooleanProperty
