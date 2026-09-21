import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaBloom = {
  id: "01a0c43e-70da-7d10-9f14-cf929ad37377",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-bloom",
  ownLength: 3.475983333333333,
  ownProgress: 0,
  partOfCollections: ["release/emei-night-at-the-opera"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3mqC2nzHECZP4GLmdKOw2p",
      externalLink: "https://open.spotify.com/track/3mqC2nzHECZP4GLmdKOw2p",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Bloom",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "bloom|7E2aQQjErJocovYFjYLzWU|208559",
  song: "song/emei-bloom",
} as const satisfies Track
