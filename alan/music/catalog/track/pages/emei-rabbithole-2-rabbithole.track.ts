import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRabbithole2Rabbithole = {
  id: "01a0c43e-77aa-74c5-9b94-7f42ec28d919",
  type: "page-type/track",
  slug: "emei-rabbithole-2-rabbithole",
  ownLength: 2.3573833333333334,
  ownProgress: 2.3573833333333334,
  partOfCollections: ["release/emei-rabbithole-2"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zYt0cbXQ6ukX3Oc8Wed4m",
      externalLink: "https://open.spotify.com/track/5zYt0cbXQ6ukX3Oc8Wed4m",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "RABBITHOLE",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "rabbithole|7E2aQQjErJocovYFjYLzWU|141443",
  song: "song/emei-rabbithole",
} as const satisfies Track
