import type { TextProperty } from "@akasha/pages-system/text-property"

export type MessageFrom = string

export const messageFrom = {
  id: "01a06818-107b-7001-9459-e63f4dbdd555",
  pageTypeSlug: "text-property",
  slug: "message-from",
  propertySlug: "from",
  definition: "who a message says sent it",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sender is a seat, a persona or a service that holds no seat.",
    },
    {
      invariantKind: "gap",
      statement: "This property is a relation to whoever sent the message.",
    },
  ],
} as const satisfies TextProperty
