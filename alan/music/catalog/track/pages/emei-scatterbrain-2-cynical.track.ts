import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrain2Cynical = {
  id: "01a0c43e-7602-72ed-bbb2-ed623ac8619c",
  type: "page-type/track",
  slug: "emei-scatterbrain-2-cynical",
  ownLength: 2.2424166666666667,
  ownProgress: 0,
  partOfCollections: ["release/emei-scatterbrain-2"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0HoXKvtfGFB2CCQvOfNjcd",
      externalLink: "https://open.spotify.com/track/0HoXKvtfGFB2CCQvOfNjcd",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Cynical",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "cynical|7E2aQQjErJocovYFjYLzWU|134545",
  song: "song/emei-cynical",
} as const satisfies Track
