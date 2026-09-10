import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ErrorMessage = string

export const errorMessage = {
  id: "01a05f3f-e3e0-7450-8ae9-c82bf3ef1359",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "error-message",
  propertySlug: "message",
  definition: "what an error said when a client met the error",
  maxLength: 2048,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message is kept as the reporting client sent the message.",
    },
    {
      invariantKind: "gap",
      statement: "A message could have whatever a person typed.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing here takes a secret out of a message before the message is committed.",
    },
  ],
} as const satisfies TextProperty
