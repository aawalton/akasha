import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFirstLoveFirstLove = {
  id: "01a0b111-328b-7c07-aad1-170e84ba0806",
  type: "page-type/track",
  slug: "sabrina-carpenter-first-love-first-love",
  ownLength: 3.457116666666667,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-first-love"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "01iyINEYgPQ7ThMZuHUsqS",
      externalLink: "https://open.spotify.com/track/01iyINEYgPQ7ThMZuHUsqS",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "First Love",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "3hyEbRtp617pNCuuQjyOmc", artistName: "Lost Kings" },
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
  ],
  trackKey: "firstlove|3hyEbRtp617pNCuuQjyOmc,74KM79TiuVKeVCqs8QtB0B|207427",
  song: "song/sabrina-carpenter-first-love",
} as const satisfies Track
