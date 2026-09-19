import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeShropshireHills = {
  id: "01a0b4c8-2871-7a92-87e8-137053d9622a",
  type: "page-type/track",
  slug: "paul-cardall-return-home-shropshire-hills",
  ownLength: 3.2373833333333333,
  ownProgress: 0,
  partOfCollections: ["release/paul-cardall-return-home"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ChwEFivNa0DbN6DkC2LCR",
      externalLink: "https://open.spotify.com/track/1ChwEFivNa0DbN6DkC2LCR",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "Shropshire Hills",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "7FQRbf8gbKw8KZQZAJWxH2", artistName: "Paul Cardall" }],
  trackKey: "shropshirehills|7FQRbf8gbKw8KZQZAJWxH2|194243",
  song: "song/paul-cardall-shropshire-hills",
} as const satisfies Track
