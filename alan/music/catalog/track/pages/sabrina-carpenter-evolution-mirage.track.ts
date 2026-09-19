import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionMirage = {
  id: "01a0b111-27b7-70a5-af26-5ebfaa6bb53b",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-mirage",
  ownLength: 3.4246666666666665,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1PnDrmc20HzbzfqVA53iYD",
      externalLink: "https://open.spotify.com/track/1PnDrmc20HzbzfqVA53iYD",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Mirage",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "mirage|74KM79TiuVKeVCqs8QtB0B|205480",
  song: "song/sabrina-carpenter-mirage",
} as const satisfies Track
