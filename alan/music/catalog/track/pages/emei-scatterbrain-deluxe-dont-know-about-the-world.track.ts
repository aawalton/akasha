import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiScatterbrainDeluxeDontKnowAboutTheWorld = {
  id: "01a0c43e-7436-7729-a1d1-d358fabc00d2",
  type: "page-type/track",
  slug: "emei-scatterbrain-deluxe-dont-know-about-the-world",
  ownLength: 2.3949333333333334,
  ownProgress: 2.3949333333333334,
  partOfCollections: ["release/emei-scatterbrain-deluxe"],
  position: 7,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "16qUvMTDF26zj5cMpI3vGV",
      externalLink: "https://open.spotify.com/track/16qUvMTDF26zj5cMpI3vGV",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Don't Know About The World",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7E2aQQjErJocovYFjYLzWU", artistName: "Emei" }],
  trackKey: "dontknowabouttheworld|7E2aQQjErJocovYFjYLzWU|143696",
  song: "song/emei-dont-know-about-the-world",
} as const satisfies Track
