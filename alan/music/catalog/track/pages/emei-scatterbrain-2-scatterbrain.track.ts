import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2Scatterbrain = {
  id: "01a0c43e-7550-7567-b373-a504f0f4f8a9",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-scatterbrain",
  ownLength: 2.1656333333333335,
  ownProgress: 2.1656333333333335,
  partOfCollections: ["release/emei-scatterbrain-2"],
  position: 2,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0LVdV9NG0y0ROxbYLpjbKc",
      externalLink: "https://open.spotify.com/track/0LVdV9NG0y0ROxbYLpjbKc",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Scatterbrain",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "scatterbrain|7E2aQQjErJocovYFjYLzWU|129938",
  song: "song/emei-scatterbrain",
} as const satisfies Track
