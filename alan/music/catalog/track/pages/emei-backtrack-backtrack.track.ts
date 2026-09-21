import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiBacktrackBacktrack = {
  id: "01a0c43e-7be0-72d4-947b-d656ccd1595a",
  type: "page-type/track",
  slug: "emei-backtrack-backtrack",
  ownLength: 2.6473333333333335,
  ownProgress: 2.6473333333333335,
  partOfCollections: ["release/emei-backtrack"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6XFtHhrlPKL4qEVDVMOcd6",
      externalLink: "https://open.spotify.com/track/6XFtHhrlPKL4qEVDVMOcd6",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Backtrack",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "backtrack|7E2aQQjErJocovYFjYLzWU|158840",
  song: "song/emei-backtrack",
  carriedBy: [
    {
      release: "release/emei-backtrack",
      discNumber: 1,
      position: 1,
      externalId: "6XFtHhrlPKL4qEVDVMOcd6",
      externalLink: "https://open.spotify.com/track/6XFtHhrlPKL4qEVDVMOcd6",
    },
  ],
} as const satisfies Track
