import type { TextProperty } from "../../../pages-system/text-property/text-property.page-type.ts"

export type Takes = string

export const takes = {
  id: "01a05027-c468-7573-9eec-f4d1ecd0bced",
  pageTypeSlug: "text-property",
  slug: "takes",
  propertySlug: "takes",
  definition: "what one thing a command takes is for",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "This says what the thing is for, never how the command works it out.",
    },
    {
      invariantKind: "departure",
      statement: "It stands on one line beside what is said, because it is read alongside it.",
    },
  ],
} as const satisfies TextProperty
