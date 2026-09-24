import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallReturnHomeShropshireHills = {
  id: "01a0b4c8-2871-7a92-87e8-137053d9622a",
  type: "page-type/track",
  slug: "paul-cardall-return-home-shropshire-hills",
  ownLength: 3.2373833333333333,
  ownProgress: 3.2373833333333333,
  partOfCollections: ["release/paul-cardall-return-home", "release/paul-cardall-shropshire-hills"],
  status: "completed",
  unit: "unit/minutes",
  title: "Shropshire Hills",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "shropshirehills|7FQRbf8gbKw8KZQZAJWxH2|194243",
  song: "song/paul-cardall-shropshire-hills",
  carriedBy: [
    {
      release: "release/paul-cardall-return-home",
      discNumber: 1,
      position: 2,
      externalId: "1ChwEFivNa0DbN6DkC2LCR",
      externalLink: "https://open.spotify.com/track/1ChwEFivNa0DbN6DkC2LCR",
    },
    {
      release: "release/paul-cardall-shropshire-hills",
      discNumber: 1,
      position: 1,
      externalId: "2ksVMUu5C2jeLVSTiFXxnY",
      externalLink: "https://open.spotify.com/track/2ksVMUu5C2jeLVSTiFXxnY",
    },
  ],
} as const satisfies Track
