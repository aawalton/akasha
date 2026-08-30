import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Notes = string

export const notes = {
  id: "01a04f23-d2d9-7edc-b47f-5f111ed8a0af",
  pageTypeSlug: "text-property",
  slug: "notes",
  propertySlug: "notes",
  definition: "what the persona worked out about the order of the work, kept where the work is",
  max: 5000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A note says why the work is ordered as it is.",
    },
    {
      invariantKind: "departure",
      statement: "An intent says only what is not yet so.",
    },
    {
      invariantKind: "departure",
      statement: "Notes stand in the order they are to be read.",
    },
    {
      invariantKind: "departure",
      statement: "The order is what they carry.",
    },
    {
      invariantKind: "absence",
      statement: "A note is no intent.",
    },
    {
      invariantKind: "absence",
      statement: "Meeting a note is not something anyone can do.",
    },
  ],
} as const satisfies TextProperty
