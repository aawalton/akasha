import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2Picky = {
  id: "01a0c43e-75da-777f-b992-21452758f141",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-picky",
  ownLength: 2.34895,
  ownProgress: 0,
  partOfCollections: ["release/emei-scatterbrain-2"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1qTHWIDjnghhPe294079cZ",
      externalLink: "https://open.spotify.com/track/1qTHWIDjnghhPe294079cZ",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Picky",
  trackType: "studio",
  discNumber: 1,
  explicit: true,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "picky|7E2aQQjErJocovYFjYLzWU|140937",
  song: "song/emei-picky",
} as const satisfies Track
