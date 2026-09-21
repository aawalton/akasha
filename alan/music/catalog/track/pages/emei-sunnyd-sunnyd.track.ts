import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiSunnydSunnyd = {
  id: "01a0c43e-7972-71d9-b266-786bee7ad46b",
  type: "page-type/track",
  slug: "emei-sunnyd-sunnyd",
  ownLength: 2.1112333333333333,
  ownProgress: 0,
  partOfCollections: ["release/emei-sunnyd"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4vnauoJf6OYYU73jPUJbZa",
      externalLink: "https://open.spotify.com/track/4vnauoJf6OYYU73jPUJbZa",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "SUNNYD",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" },
    { externalId: "0vqJkZ0RpLZixt3lTmD8vP", artistName: "Whethan" },
  ],
  trackKey: "sunnyd|0vqJkZ0RpLZixt3lTmD8vP,7E2aQQjErJocovYFjYLzWU|126674",
  song: "song/emei-sunnyd",
} as const satisfies Track
