import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type MessageFrom = string

export const messageFrom = {
  id: "01a06818-107b-7001-9459-e63f4dbdd555",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "message-from",
  propertySlug: "from",
  definition: "who a message says sent it",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sender is a seat or a persona or a service that has no seat.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to the sender of the message.",
    },
  ],
} as const satisfies TextProperty
