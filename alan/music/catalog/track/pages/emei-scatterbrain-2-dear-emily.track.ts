import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2DearEmily = {
  id: "01a0c43e-75b5-7919-902e-ed3e3a23bc12",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-dear-emily",
  ownLength: 2.7156166666666666,
  ownProgress: 2.7156166666666666,
  partOfCollections: ["release/emei-scatterbrain-2"],
  position: 4,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2Gu0k0HrtR7rYdfkA48D0J",
      externalLink: "https://open.spotify.com/track/2Gu0k0HrtR7rYdfkA48D0J",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Dear Emily",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "dearemily|7E2aQQjErJocovYFjYLzWU|162937",
  song: "song/emei-dear-emily",
} as const satisfies Track
