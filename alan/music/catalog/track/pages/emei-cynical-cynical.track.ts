import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiCynicalCynical = {
  id: "01a0c43e-7b4e-76f1-9f0d-ad16e8e4c644",
  type: "page-type/track",
  slug: "emei-cynical-cynical",
  ownLength: 2.2430333333333334,
  ownProgress: 2.2430333333333334,
  partOfCollections: ["release/emei-cynical"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DT396Bk4kxXH0Y8ADyyE3",
      externalLink: "https://open.spotify.com/track/5DT396Bk4kxXH0Y8ADyyE3",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Cynical",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "cynical|7E2aQQjErJocovYFjYLzWU|134582",
  song: "song/emei-cynical",
} as const satisfies Track
