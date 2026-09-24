import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionRunAndHide = {
  id: "01a0b111-2792-736e-aaf6-d7eac0c154f8",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-run-and-hide",
  ownLength: 3.494,
  ownProgress: 3.494,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "Run and Hide",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "runandhide|74KM79TiuVKeVCqs8QtB0B|209640",
  song: "song/sabrina-carpenter-run-and-hide",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 5,
      externalId: "24fhYqs2KtWbHfY4Ngdf5U",
      externalLink: "https://open.spotify.com/track/24fhYqs2KtWbHfY4Ngdf5U",
    },
  ],
} as const satisfies Track
