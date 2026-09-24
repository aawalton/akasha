import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionShadows = {
  id: "01a0b111-27f6-7460-b914-22a587f50727",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-shadows",
  ownLength: 2.8737666666666666,
  ownProgress: 2.8737666666666666,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shadows",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "shadows|74KM79TiuVKeVCqs8QtB0B|172426",
  song: "song/sabrina-carpenter-shadows",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 8,
      externalId: "65RTUeyKsXuiIocxEzYhMY",
      externalLink: "https://open.spotify.com/track/65RTUeyKsXuiIocxEzYhMY",
    },
  ],
} as const satisfies Track
