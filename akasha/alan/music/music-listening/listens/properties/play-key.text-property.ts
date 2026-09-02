import type { TextProperty } from "@akasha/pages-system/text-property"

export type PlayKey = string

export const playKey = {
  id: "01a06240-340f-7002-b005-55a12884b9be",
  pageTypeSlug: "text-property",
  slug: "play-key",
  propertySlug: "play-key",
  definition: "the text one listen is told apart from every other listen by",
  max: 100,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A play key is a Spotify track id and then `@` and then when the play finished.",
    },
  ],
} as const satisfies TextProperty
