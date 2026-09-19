import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterShortNSweetDeluxeEspresso = {
  id: "01a0b111-1dc9-7e7e-9da5-6228f6ffc847",
  type: "page-type/track",
  slug: "sabrina-carpenter-short-n-sweet-deluxe-espresso",
  ownLength: 2.9242166666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-short-n-sweet-deluxe"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2LU2CYKUZUc1iAErxJb1dK",
      externalLink: "https://open.spotify.com/track/2LU2CYKUZUc1iAErxJb1dK",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Espresso",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "espresso|74KM79TiuVKeVCqs8QtB0B|175453",
  song: "song/sabrina-carpenter-espresso",
} as const satisfies Track
