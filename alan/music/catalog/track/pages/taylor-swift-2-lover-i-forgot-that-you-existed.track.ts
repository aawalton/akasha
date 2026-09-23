import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverIForgotThatYouExisted = {
  id: "01a0ce86-6dd0-7de7-a258-3e7fd4a43248",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-i-forgot-that-you-existed",
  ownLength: 2.844,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Forgot That You Existed",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "iforgotthatyouexisted|06HL4z0CvFAxyc27GXpf02|170640",
  song: "song/taylor-swift-i-forgot-that-you-existed",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 1,
      externalId: "43rA71bccXFGD4C8GOpIlN",
      externalLink: "https://open.spotify.com/track/43rA71bccXFGD4C8GOpIlN",
    },
  ],
} as const satisfies Track
