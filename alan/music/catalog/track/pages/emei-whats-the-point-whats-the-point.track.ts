import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiWhatsThePointWhatsThePoint = {
  id: "01a0c43e-7181-7d61-89b9-9ec22fab542d",
  type: "page-type/track",
  slug: "emei-whats-the-point-whats-the-point",
  ownLength: 2.729233333333333,
  ownProgress: 0,
  partOfCollections: ["release/emei-whats-the-point"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5yYGr8R31sQLOMVIgNCnrN",
      externalLink: "https://open.spotify.com/track/5yYGr8R31sQLOMVIgNCnrN",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "What's the Point!",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "whatsthepoint|7E2aQQjErJocovYFjYLzWU|163754",
  song: "song/emei-whats-the-point",
} as const satisfies Track
