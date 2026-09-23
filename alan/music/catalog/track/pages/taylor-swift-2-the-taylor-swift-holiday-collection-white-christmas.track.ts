import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTaylorSwiftHolidayCollectionWhiteChristmas = {
  id: "01a0ce86-ab50-7ca0-ab99-b0b2909759e5",
  type: "page-type/track",
  slug: "taylor-swift-2-the-taylor-swift-holiday-collection-white-christmas",
  ownLength: 2.566666666666667,
  ownProgress: 2.566666666666667,
  partOfCollections: ["release/taylor-swift-2-the-taylor-swift-holiday-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "White Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "whitechristmas|06HL4z0CvFAxyc27GXpf02|154000",
  song: "song/taylor-swift-white-christmas",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-taylor-swift-holiday-collection",
      discNumber: 1,
      position: 6,
      externalId: "7GZ3KDorsc1yWndEtzGTjf",
      externalLink: "https://open.spotify.com/track/7GZ3KDorsc1yWndEtzGTjf",
    },
  ],
} as const satisfies Track
