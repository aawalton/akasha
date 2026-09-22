import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const playKey = {
  id: "01a06240-340f-7002-b005-55a12884b9be",
  type: "page-type/text-property",
  slug: "play-key",
  propertySlug: "play-key",
  definition: "the text telling a listen apart from every other listen",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A play key is a Spotify track id and then `@` and then when the play finished.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
