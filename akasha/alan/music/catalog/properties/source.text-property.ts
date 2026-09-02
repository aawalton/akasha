import type { TextProperty } from "@akasha/pages-system/text-property"

export type Source = "musicbrainz"

export const source = {
  id: "01a06243-144b-7002-9613-2bfb38ddfa5c",
  pageTypeSlug: "text-property",
  slug: "source",
  propertySlug: "source",
  definition: "the provider a page was imported from",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A source is `musicbrainz`.",
    },
    {
      invariantKind: "absence",
      statement: "No page names `spotify` as a source.",
    },
  ],
} as const satisfies TextProperty
