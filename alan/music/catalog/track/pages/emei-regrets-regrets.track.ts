import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiRegretsRegrets = {
  id: "01a0c43e-7d91-7277-94ea-133fb1a9a164",
  type: "page-type/track",
  slug: "emei-regrets-regrets",
  ownLength: 2.03755,
  ownProgress: 2.03755,
  partOfCollections: ["release/emei-regrets"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "64l8UD4BRovWTSyrLqManD",
      externalLink: "https://open.spotify.com/track/64l8UD4BRovWTSyrLqManD",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Regrets",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "regrets|7E2aQQjErJocovYFjYLzWU|122253",
  song: "song/emei-regrets",
  carriedBy: [
    {
      release: "release/emei-regrets",
      discNumber: 1,
      position: 1,
      externalId: "64l8UD4BRovWTSyrLqManD",
      externalLink: "https://open.spotify.com/track/64l8UD4BRovWTSyrLqManD",
    },
  ],
} as const satisfies Track
