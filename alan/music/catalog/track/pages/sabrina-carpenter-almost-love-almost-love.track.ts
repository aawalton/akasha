import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterAlmostLoveAlmostLove = {
  id: "01a0b111-30ec-76e5-82bd-3d0243d76332",
  type: "page-type/track",
  slug: "sabrina-carpenter-almost-love-almost-love",
  ownLength: 3.5395166666666666,
  ownProgress: 3.5395166666666666,
  partOfCollections: ["release/sabrina-carpenter-almost-love"],
  status: "completed",
  unit: "unit/minutes",
  title: "Almost Love",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "almostlove|74KM79TiuVKeVCqs8QtB0B|212371",
  song: "song/sabrina-carpenter-almost-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-almost-love",
      discNumber: 1,
      position: 1,
      externalId: "0T4n0oydz4ZHveahETnREG",
      externalLink: "https://open.spotify.com/track/0T4n0oydz4ZHveahETnREG",
    },
  ],
} as const satisfies Track
