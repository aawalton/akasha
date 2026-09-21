import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraEndOfAnEra = {
  id: "01a0c43e-7d6a-7ad0-9db2-18844d6b608b",
  type: "page-type/track",
  slug: "emei-end-of-an-era-end-of-an-era",
  ownLength: 2.2330833333333335,
  ownProgress: 0,
  partOfCollections: ["release/emei-end-of-an-era"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5esqIDtXmnl0EIoiuLFsjp",
      externalLink: "https://open.spotify.com/track/5esqIDtXmnl0EIoiuLFsjp",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "End of an Era",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "endofanera|7E2aQQjErJocovYFjYLzWU|133985",
  song: "song/emei-end-of-an-era",
} as const satisfies Track
