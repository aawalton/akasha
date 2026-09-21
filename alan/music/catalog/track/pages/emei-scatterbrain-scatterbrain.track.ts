import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainScatterbrain = {
  id: "01a0c43e-7b9e-7bbb-8e99-bc4b6183e54b",
  type: "page-type/track",
  slug: "emei-scatterbrain-scatterbrain",
  ownLength: 2.1656333333333335,
  ownProgress: 0,
  partOfCollections: ["release/emei-scatterbrain"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5DKcc3WxMwE7JB1IxCrdrs",
      externalLink: "https://open.spotify.com/track/5DKcc3WxMwE7JB1IxCrdrs",
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
