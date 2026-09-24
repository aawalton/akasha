import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionThumbs = {
  id: "01a0b111-274f-783e-99d8-0d6d22cfcb9e",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-thumbs",
  ownLength: 3.6077666666666666,
  ownProgress: 3.6077666666666666,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "Thumbs",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "thumbs|74KM79TiuVKeVCqs8QtB0B|216466",
  song: "song/sabrina-carpenter-thumbs",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 3,
      externalId: "6WC5fhc9XMaCrUNKNjm9xE",
      externalLink: "https://open.spotify.com/track/6WC5fhc9XMaCrUNKNjm9xE",
    },
  ],
} as const satisfies Track
