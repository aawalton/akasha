import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeCynical = {
  id: "01a0c43e-73f0-7cff-b0f4-84ca9070dde0",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-cynical",
  ownLength: 2.2424166666666667,
  ownProgress: 2.2424166666666667,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 6,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7cPZrpNtQryhEjeJ4j4MkL",
      externalLink: "https://open.spotify.com/track/7cPZrpNtQryhEjeJ4j4MkL",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Cynical",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "cynical|7E2aQQjErJocovYFjYLzWU|134545",
  song: "song/emei-cynical",
} as const satisfies Track
