import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const playKey = {
  id: "01a06240-340f-7002-b005-55a12884b9be",
  type: "page-type/text-property",
  slug: "play-key",
  propertySlug: "play-key",
  definition: "the id of a time Alan hears a track",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A play key is a Spotify track id and then `@` and then when the play finished.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T13:12:49.935Z",
  updatedAt: "2026-10-30T16:39:54.218Z",
} as const satisfies TextProperty
