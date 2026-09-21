import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaNoah = {
  id: "01a0c43e-7094-7bd4-a837-4d46ce8b76a6",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-noah",
  ownLength: 2.6654833333333334,
  ownProgress: 0,
  partOfCollections: ["release/emei-night-at-the-opera"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1Ez185Inp2jiQWtcvtAQXl",
      externalLink: "https://open.spotify.com/track/1Ez185Inp2jiQWtcvtAQXl",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Noah",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "noah|7E2aQQjErJocovYFjYLzWU|159929",
  song: "song/emei-noah",
} as const satisfies Track
