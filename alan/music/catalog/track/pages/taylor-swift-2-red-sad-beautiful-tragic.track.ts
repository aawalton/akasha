import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedSadBeautifulTragic = {
  id: "01a0ce86-8586-714b-a2db-e312c2a32ebc",
  type: "page-type/track",
  slug: "taylor-swift-2-red-sad-beautiful-tragic",
  ownLength: 4.728,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Sad Beautiful Tragic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "sadbeautifultragic|06HL4z0CvFAxyc27GXpf02|283680",
  song: "song/taylor-swift-sad-beautiful-tragic",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 12,
      externalId: "6LKjHhOW1az75pCQ9XJJtF",
      externalLink: "https://open.spotify.com/track/6LKjHhOW1az75pCQ9XJJtF",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 12,
      externalId: "5QKhg4r4Ibt0LVTmWEXTEg",
      externalLink: "https://open.spotify.com/track/5QKhg4r4Ibt0LVTmWEXTEg",
    },
  ],
} as const satisfies Track
