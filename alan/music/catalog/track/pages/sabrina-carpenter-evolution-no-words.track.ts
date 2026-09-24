import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionNoWords = {
  id: "01a0b111-276e-71e6-a989-be20dd8b0868",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-no-words",
  ownLength: 3.5431,
  ownProgress: 3.5431,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  status: "completed",
  unit: "unit/minutes",
  title: "No Words",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sabrina-carpenter" }],
  trackKey: "nowords|74KM79TiuVKeVCqs8QtB0B|212586",
  song: "song/sabrina-carpenter-no-words",
  carriedBy: [
    {
      release: "release/sabrina-carpenter-evolution",
      discNumber: 1,
      position: 4,
      externalId: "7gnUZFwdWMCaLNPDbGaq0Y",
      externalLink: "https://open.spotify.com/track/7gnUZFwdWMCaLNPDbGaq0Y",
    },
  ],
} as const satisfies Track
