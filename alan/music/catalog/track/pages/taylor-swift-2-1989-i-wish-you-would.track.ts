import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989IWishYouWould = {
  id: "01a0ce86-7f0e-7cbb-bdc4-b936b7ad0622",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-i-wish-you-would",
  ownLength: 3.457333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-1989", "release/taylor-swift-2-1989-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "I Wish You Would",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "iwishyouwould|06HL4z0CvFAxyc27GXpf02|207440",
  song: "song/taylor-swift-i-wish-you-would",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989",
      discNumber: 1,
      position: 7,
      externalId: "3wmN11qXGL0HyPojvEE1D9",
      externalLink: "https://open.spotify.com/track/3wmN11qXGL0HyPojvEE1D9",
    },
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 7,
      externalId: "1B5VzXPqMlvRw0U4HJY3dJ",
      externalLink: "https://open.spotify.com/track/1B5VzXPqMlvRw0U4HJY3dJ",
    },
  ],
} as const satisfies Track
