import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TheTaylorSwiftHolidayCollectionSantaBaby = {
  id: "01a0ce86-aad3-768e-8de0-121905285b7b",
  type: "page-type/track",
  slug: "taylor-swift-2-the-taylor-swift-holiday-collection-santa-baby",
  ownLength: 2.6433333333333335,
  ownProgress: 2.6433333333333335,
  partOfCollections: ["release/taylor-swift-2-the-taylor-swift-holiday-collection"],
  status: "completed",
  unit: "unit/minutes",
  title: "Santa Baby",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "santababy|06HL4z0CvFAxyc27GXpf02|158600",
  song: "song/taylor-swift-santa-baby",
  carriedBy: [
    {
      release: "release/taylor-swift-2-the-taylor-swift-holiday-collection",
      discNumber: 1,
      position: 3,
      externalId: "71IScwIe7bcIlpnlkbKVQw",
      externalLink: "https://open.spotify.com/track/71IScwIe7bcIlpnlkbKVQw",
    },
  ],
} as const satisfies Track
