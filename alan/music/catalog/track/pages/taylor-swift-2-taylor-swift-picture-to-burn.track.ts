import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftPictureToBurn = {
  id: "01a0ce86-9567-7543-a76b-4ef09a159998",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-picture-to-burn",
  ownLength: 2.8844333333333334,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Picture To Burn",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "picturetoburn|06HL4z0CvFAxyc27GXpf02|173066",
  song: "song/taylor-swift-picture-to-burn",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 2,
      externalId: "32mVHdy0bi1XKgr0ajsBlG",
      externalLink: "https://open.spotify.com/track/32mVHdy0bi1XKgr0ajsBlG",
    },
  ],
} as const satisfies Track
