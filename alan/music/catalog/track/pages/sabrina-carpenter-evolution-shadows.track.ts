import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterEvolutionShadows = {
  id: "01a0b111-27f6-7460-b914-22a587f50727",
  type: "page-type/track",
  slug: "sabrina-carpenter-evolution-shadows",
  ownLength: 2.8737666666666666,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-evolution"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "65RTUeyKsXuiIocxEzYhMY",
      externalLink: "https://open.spotify.com/track/65RTUeyKsXuiIocxEzYhMY",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Shadows",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" }],
  trackKey: "shadows|74KM79TiuVKeVCqs8QtB0B|172426",
  song: "song/sabrina-carpenter-shadows",
} as const satisfies Track
