import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const messageBody = {
  id: "01a06818-107b-7003-af7a-fe09cd6ace6c",
  type: "text-property",
  slug: "message-body",
  propertySlug: "body",
  definition: "the words a message carries",
  maxLength: 20000,
  nameFormat: null,
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
  types: "ts",
} as const satisfies TextProperty
