import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaBloom = {
  id: "01a0c43e-70da-7d10-9f14-cf929ad37377",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-bloom",
  grade: "C",
  ownLength: 3.475983333333333,
  ownProgress: 0,
  partOfCollections: ["release/emei-night-at-the-opera"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Bloom",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "bloom|7E2aQQjErJocovYFjYLzWU|208559",
  song: "song/emei-bloom",
  carriedBy: [
    {
      release: "release/emei-night-at-the-opera",
      discNumber: 1,
      position: 4,
      externalId: "3mqC2nzHECZP4GLmdKOw2p",
      externalLink: "https://open.spotify.com/track/3mqC2nzHECZP4GLmdKOw2p",
    },
  ],
} as const satisfies Track
