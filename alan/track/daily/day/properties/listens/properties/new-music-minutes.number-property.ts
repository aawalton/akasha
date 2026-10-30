import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const newMusicMinutes = {
  id: "01a06240-340f-7006-a08a-3236a3341467",
  type: "page-type/number-property",
  slug: "new-music-minutes",
  propertySlug: "new-music-minutes",
  definition: "the minutes of a track Alan hears for the first time",
  max: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A play that is no first listen scores no new music minutes.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T13:12:49.935Z",
  updatedAt: "2026-10-30T16:39:28.820Z",
} as const satisfies NumberProperty
