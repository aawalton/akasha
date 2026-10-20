import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaWeAreBornYouveChanged = {
  id: "01a15994-8c71-764f-acef-87698b6c953f",
  type: "page-type/track",
  slug: "sia-we-are-born-youve-changed",
  ownLength: 3.1864333333333335,
  ownProgress: 0,
  partOfCollections: ["release/sia-we-are-born", "release/sia-you-ve-changed"],
  status: "not-started",
  unit: "unit/minutes",
  title: "You've Changed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "youvechanged|5WUlDfRSoLAfcVSX1WnrxN|191186",
  song: "song/sia-you-ve-changed",
  carriedBy: [
    {
      release: "release/sia-we-are-born",
      discNumber: 1,
      position: 4,
      externalId: "2CfNBLuqXzbrY3omMaKDvp",
      externalLink: "https://open.spotify.com/track/2CfNBLuqXzbrY3omMaKDvp",
    },
    {
      release: "release/sia-you-ve-changed",
      discNumber: 1,
      position: 1,
      externalId: "5JWZm1vNkG9E2Gs4m4EH5t",
      externalLink: "https://open.spotify.com/track/5JWZm1vNkG9E2Gs4m4EH5t",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
