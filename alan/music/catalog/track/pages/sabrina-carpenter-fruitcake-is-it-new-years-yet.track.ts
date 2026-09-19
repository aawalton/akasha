import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFruitcakeIsItNewYearsYet = {
  id: "01a0b111-2d17-7df5-9da9-cdc7316955a7",
  type: "page-type/track",
  slug: "sabrina-carpenter-fruitcake-is-it-new-years-yet",
  ownLength: 2.643,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-fruitcake"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "48xGcNwekbGcux5rIjKPQM",
      externalLink: "https://open.spotify.com/track/48xGcNwekbGcux5rIjKPQM",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "is it new years yet?",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "isitnewyearsyet|74KM79TiuVKeVCqs8QtB0B|158580",
  song: "song/sabrina-carpenter-is-it-new-years-yet",
} as const satisfies Track
