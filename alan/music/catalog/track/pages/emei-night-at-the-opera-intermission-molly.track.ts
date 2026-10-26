import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiNightAtTheOperaIntermissionMolly = {
  id: "01a17878-1d58-7ee9-a3ef-e26968459ddf",
  type: "page-type/track",
  slug: "emei-night-at-the-opera-intermission-molly",
  ownLength: 3.2,
  ownProgress: 0,
  partOfCollections: ["release/emei-night-at-the-opera-intermission", "release/emei-molly"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Molly",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "molly|7E2aQQjErJocovYFjYLzWU|192000",
  song: "song/emei-molly",
  carriedBy: [
    {
      release: "release/emei-molly",
      discNumber: 1,
      position: 1,
      externalId: "2K6OICqRw35RvWFsCCCh1U",
      externalLink: "https://open.spotify.com/track/2K6OICqRw35RvWFsCCCh1U",
    },
    {
      release: "release/emei-night-at-the-opera-intermission",
      discNumber: 1,
      position: 1,
      externalId: "7mrclSenR6NoRGOdIniaTN",
      externalLink: "https://open.spotify.com/track/7mrclSenR6NoRGOdIniaTN",
    },
  ],
  createdAt: "2026-10-26T13:48:20.183Z",
  updatedAt: "2026-10-26T13:48:20.183Z",
} as const satisfies Track
