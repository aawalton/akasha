import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterFirstLoveFirstLove = {
  id: "01a0b111-328b-7c07-aad1-170e84ba0806",
  type: "page-type/track",
  slug: "sabrina-carpenter-first-love-first-love",
  ownLength: 3.457116666666667,
  ownProgress: 3.457116666666667,
  partOfCollections: ["release/sabrina-carpenter-first-love"],
  status: "completed",
  unit: "unit/minutes",
  title: "First Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artistName: "Lost Kings" }, { artist: "artist/sabrina-carpenter" }],
  trackKey: "firstlove|3hyEbRtp617pNCuuQjyOmc,74KM79TiuVKeVCqs8QtB0B|207427",
  song: "song/sabrina-carpenter-first-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-first-love",
      discNumber: 1,
      position: 1,
      externalId: "01iyINEYgPQ7ThMZuHUsqS",
      externalLink: "https://open.spotify.com/track/01iyINEYgPQ7ThMZuHUsqS",
    },
  ],
} as const satisfies Track
