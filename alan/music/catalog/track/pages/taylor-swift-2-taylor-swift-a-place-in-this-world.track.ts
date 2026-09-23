import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftAPlaceInThisWorld = {
  id: "01a0ce86-95b0-7243-aace-b40dbfb78aba",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-a-place-in-this-world",
  ownLength: 3.32,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "not-started",
  unit: "unit/minutes",
  title: "A Place in this World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "aplaceinthisworld|06HL4z0CvFAxyc27GXpf02|199200",
  song: "song/taylor-swift-a-place-in-this-world",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 4,
      externalId: "73OX8GdpOeGzKC6OvGSbsv",
      externalLink: "https://open.spotify.com/track/73OX8GdpOeGzKC6OvGSbsv",
    },
  ],
} as const satisfies Track
