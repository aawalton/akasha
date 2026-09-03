import type { TextProperty } from "@akasha/pages-system/text-property"

export type MessageBody = string

export const messageBody = {
  id: "01a06818-107b-7003-af7a-fe09cd6ace6c",
  pageTypeSlug: "text-property",
  slug: "message-body",
  propertySlug: "body",
  definition: "the words a message carries",
  max: 20000,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The words reach the recipient marked as data rather than as instruction.",
    },
    {
      invariantKind: "departure",
      statement: "The words are sent as written rather than filled in as the message sends.",
    },
  ],
} as const satisfies TextProperty
