import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionSpace = {
  id: "01a0b111-2815-74b4-88b5-8220d3b53d99",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-space",
  ownLength: 3.1048833333333334,
  ownProgress: 3.1048833333333334,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "Space",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "space|74KM79TiuVKeVCqs8QtB0B|186293",
  song: "song/sabrina-carpenter-space",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 9,
      externalId: "4uiZziAgyMvmKr4tujpcXm",
      externalLink: "https://open.spotify.com/track/4uiZziAgyMvmKr4tujpcXm",
    },
  ],
} as const satisfies Track
