import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export type ErrorKind = string

export const errorKind = {
  id: "01a05f3f-e3e0-70ed-a9ac-229acd8e154c",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "error-kind",
  propertySlug: "kind",
  definition: "the way a client came to meet an error",
  maxLength: 32,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The kinds a report may have are named by the report shape.",
    },
    {
      invariantKind: "absence",
      statement: "The kinds are restated nowhere here.",
    },
  ],
} as const satisfies TextProperty
