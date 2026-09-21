import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiEndOfAnEraTrustIssues = {
  id: "01a0c43e-7cb1-7e77-b8ce-d6fd73bcff58",
  type: "page-type/track",
  slug: "emei-end-of-an-era-trust-issues",
  ownLength: 2.348,
  ownProgress: 0,
  partOfCollections: ["release/emei-end-of-an-era"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1w9C1Oza8HfR93yN43CSLG",
      externalLink: "https://open.spotify.com/track/1w9C1Oza8HfR93yN43CSLG",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Trust Issues",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "trustissues|7E2aQQjErJocovYFjYLzWU|140880",
  song: "song/emei-trust-issues",
} as const satisfies Track
