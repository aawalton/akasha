import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionNoWords = {
  id: "01a0b111-276e-71e6-a989-be20dd8b0868",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-no-words",
  ownLength: 3.5431,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7gnUZFwdWMCaLNPDbGaq0Y",
      externalLink: "https://open.spotify.com/track/7gnUZFwdWMCaLNPDbGaq0Y",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "No Words",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "nowords|74KM79TiuVKeVCqs8QtB0B|212586",
  song: "song/sabrina-carpenter-no-words",
} as const satisfies Track
