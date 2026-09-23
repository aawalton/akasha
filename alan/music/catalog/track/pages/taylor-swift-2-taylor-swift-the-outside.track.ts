import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftTheOutside = {
  id: "01a0ce86-95fc-7521-8bb7-f11cefecd3c2",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-the-outside",
  ownLength: 3.451766666666667,
  ownProgress: 3.451766666666667,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Outside",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "theoutside|06HL4z0CvFAxyc27GXpf02|207106",
  song: "song/taylor-swift-the-outside",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 6,
      externalId: "2QA3IixpRcKyOdG7XDzRgv",
      externalLink: "https://open.spotify.com/track/2QA3IixpRcKyOdG7XDzRgv",
    },
  ],
} as const satisfies Track
