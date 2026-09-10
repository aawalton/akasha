import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ErrorUserAgent = string

export const errorUserAgent = {
  id: "01a05f3f-e3e0-7e41-90e7-af904c25308e",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "error-user-agent",
  propertySlug: "user-agent",
  definition: "the browser or shell that reported an error",
  maxLength: 1024,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A report raised by a server names the server rather than a browser.",
    },
  ],
} as const satisfies TextProperty
