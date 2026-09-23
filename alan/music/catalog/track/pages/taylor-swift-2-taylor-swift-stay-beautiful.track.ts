import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftStayBeautiful = {
  id: "01a0ce86-964a-7fe2-ac6a-ae8a5387a6b1",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-stay-beautiful",
  ownLength: 3.9342166666666665,
  ownProgress: 3.9342166666666665,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "Stay Beautiful",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "staybeautiful|06HL4z0CvFAxyc27GXpf02|236053",
  song: "song/taylor-swift-stay-beautiful",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 8,
      externalId: "2ZoOmCSgj0ypVAmGd1ve4y",
      externalLink: "https://open.spotify.com/track/2ZoOmCSgj0ypVAmGd1ve4y",
    },
  ],
} as const satisfies Track
