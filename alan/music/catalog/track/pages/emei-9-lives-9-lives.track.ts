import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emei9Lives9Lives = {
  id: "01a0c43e-78e3-70f4-8a3b-e4a29af09c78",
  type: "page-type/track",
  slug: "emei-9-lives-9-lives",
  ownLength: 3.0375833333333335,
  ownProgress: 0,
  partOfCollections: ["release/emei-9-lives"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64APtv04ls8z8Cjv6iGUsY",
      externalLink: "https://open.spotify.com/track/64APtv04ls8z8Cjv6iGUsY",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "9 LIVES",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "9lives|7E2aQQjErJocovYFjYLzWU|182255",
  song: "song/emei-9-lives",
} as const satisfies Track
