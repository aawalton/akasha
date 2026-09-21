import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiDistractedDistracted = {
  id: "01a0c43e-7e85-7b3d-96f0-f64bb65154e0",
  type: "page-type/track",
  slug: "emei-distracted-distracted",
  ownLength: 2.68,
  ownProgress: 2.68,
  partOfCollections: ["release/emei-distracted"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3cajPGP49WC0dxOsRmS1WY",
      externalLink: "https://open.spotify.com/track/3cajPGP49WC0dxOsRmS1WY",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Distracted",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "distracted|7E2aQQjErJocovYFjYLzWU|160800",
  song: "song/emei-distracted",
} as const satisfies Track
