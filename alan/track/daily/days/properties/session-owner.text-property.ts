import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type SessionOwner = string

export const sessionOwner = {
  id: "01a05fd8-c30f-7600-86de-1d33a70265bd",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "session-owner",
  propertySlug: "owner",
  definition: "the person a record belongs to",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "gap",
      statement: "This property is a relation to a person.",
    },
  ],
} as const satisfies TextProperty
