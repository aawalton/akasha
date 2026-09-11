import type { NumberProperty } from "akasha/pages/number-properties/number-property.page-type.types.ts"

export const newMusicMinutes = {
  id: "01a06240-340f-7006-a08a-3236a3341467",
  type: "number-property",
  slug: "new-music-minutes",
  propertySlug: "new-music-minutes",
  definition: "the minutes a first play of a track scores",
  max: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A play that is no first listen scores no new music minutes.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
