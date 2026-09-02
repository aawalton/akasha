import type { NumberProperty } from "@akasha/pages-system/number-property"

export type NewMusicMinutes = number

export const newMusicMinutes = {
  id: "01a06240-340f-7006-a08a-3236a3341467",
  pageTypeSlug: "number-property",
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
} as const satisfies NumberProperty
