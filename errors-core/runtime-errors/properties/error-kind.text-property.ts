import type { TextProperty } from "@akasha/pages-system/text-property"

export type Kind = string

export const errorKind = {
  id: "01a05f3f-e3e0-70ed-a9ac-229acd8e154c",
  pageTypeSlug: "text-property",
  slug: "error-kind",
  propertySlug: "kind",
  definition: "the way a client came to meet an error",
  max: 32,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The kinds a report may carry are named by the report shape.",
    },
    {
      invariantKind: "absence",
      statement: "The kinds are restated nowhere here.",
    },
  ],
} as const satisfies TextProperty
