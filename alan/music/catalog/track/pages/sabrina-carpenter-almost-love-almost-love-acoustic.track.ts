import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterAlmostLoveAlmostLoveAcoustic = {
  id: "01a0b111-3129-7d0b-9f9d-6b8203413597",
  type: "page-type/track",
  slug: "sabrina-carpenter-almost-love-almost-love-acoustic",
  ownLength: 3.7994,
  ownProgress: 3.7994,
  partOfCollections: ["release/sabrina-carpenter-almost-love"],
  status: "completed",
  unit: "unit/minutes",
  title: "Almost Love - Acoustic",
  trackType: "acoustic",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "almostloveacoustic|74KM79TiuVKeVCqs8QtB0B|227964",
  song: "song/sabrina-carpenter-almost-love",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-almost-love",
      discNumber: 1,
      position: 3,
      externalId: "08qOK7vtuiypjql1M4dFnU",
      externalLink: "https://open.spotify.com/track/08qOK7vtuiypjql1M4dFnU",
    },
  ],
} as const satisfies Track
