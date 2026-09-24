import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionDontWantItBack = {
  id: "01a0b111-27d7-7c15-a5a2-48b548fb5d1e",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-dont-want-it-back",
  ownLength: 3.030883333333333,
  ownProgress: 3.030883333333333,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Want It Back",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "dontwantitback|74KM79TiuVKeVCqs8QtB0B|181853",
  song: "song/sabrina-carpenter-dont-want-it-back",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 7,
      externalId: "2yqhHi9QfZ5INE13sS5Bva",
      externalLink: "https://open.spotify.com/track/2yqhHi9QfZ5INE13sS5Bva",
    },
  ],
} as const satisfies Track
