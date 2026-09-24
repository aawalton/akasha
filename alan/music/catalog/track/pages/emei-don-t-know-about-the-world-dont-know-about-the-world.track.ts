import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const emeiDonTKnowAboutTheWorldDontKnowAboutTheWorld = {
  id: "01a0c43e-7b26-7bb1-9ef3-a0c10dab2400",
  type: "page-type/track",
  slug: "emei-don-t-know-about-the-world-dont-know-about-the-world",
  ownLength: 2.3949333333333334,
  ownProgress: 2.3949333333333334,
  partOfCollections: [
    "release/emei-don-t-know-about-the-world",
    "release/emei-scatterbrain-2",
    "release/emei-scatterbrain-deluxe",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Don't Know About The World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/emei" }],
  trackKey: "dontknowabouttheworld|7E2aQQjErJocovYFjYLzWU|143696",
  song: "song/emei-dont-know-about-the-world",
  carriedBy: [
    {
      release: "release/emei-don-t-know-about-the-world",
      discNumber: 1,
      position: 1,
      externalId: "76M8uxD1WvL0H4h2Jv8Fm5",
      externalLink: "https://open.spotify.com/track/76M8uxD1WvL0H4h2Jv8Fm5",
    },
    {
      release: "release/emei-scatterbrain-2",
      discNumber: 1,
      position: 7,
      externalId: "7xil2jjcEh4kaU3XXoAPh8",
      externalLink: "https://open.spotify.com/track/7xil2jjcEh4kaU3XXoAPh8",
    },
    {
      release: "release/emei-scatterbrain-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "16qUvMTDF26zj5cMpI3vGV",
      externalLink: "https://open.spotify.com/track/16qUvMTDF26zj5cMpI3vGV",
    },
  ],
} as const satisfies Track
