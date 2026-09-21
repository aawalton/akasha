import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxe711 = {
  id: "01a0c43e-729b-796e-aaa0-e579d1a525ac",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-711",
  ownLength: 2.4854166666666666,
  ownProgress: 2.4854166666666666,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4zqN0qznZHZXVTWCidQxpV",
      externalLink: "https://open.spotify.com/track/4zqN0qznZHZXVTWCidQxpV",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "711",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "711|7E2aQQjErJocovYFjYLzWU|149125",
  song: "song/emei-711",
} as const satisfies Track
