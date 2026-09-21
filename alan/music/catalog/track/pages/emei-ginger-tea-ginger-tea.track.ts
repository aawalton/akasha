import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiGingerTeaGingerTea = {
  id: "01a0c43e-7677-74d4-b2fe-e49e50317dd9",
  type: "page-type/track",
  slug: "emei-ginger-tea-ginger-tea",
  ownLength: 2.620433333333333,
  ownProgress: 0,
  partOfCollections: ["release/emei-ginger-tea"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4jBCtBR2iSffMZPh3Bdk2L",
      externalLink: "https://open.spotify.com/track/4jBCtBR2iSffMZPh3Bdk2L",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Ginger Tea",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "gingertea|7E2aQQjErJocovYFjYLzWU|157226",
  song: "song/emei-ginger-tea",
} as const satisfies Track
