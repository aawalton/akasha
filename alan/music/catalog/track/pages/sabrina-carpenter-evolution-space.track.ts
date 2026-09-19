import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionSpace = {
  id: "01a0b111-2815-74b4-88b5-8220d3b53d99",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-space",
  ownLength: 3.1048833333333334,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4uiZziAgyMvmKr4tujpcXm",
      externalLink: "https://open.spotify.com/track/4uiZziAgyMvmKr4tujpcXm",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Space",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "space|74KM79TiuVKeVCqs8QtB0B|186293",
  song: "song/sabrina-carpenter-space",
} as const satisfies Track
