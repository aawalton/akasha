import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989Style = {
  id: "01a0ce86-7e65-72c3-8a58-f52627120168",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-style",
  ownLength: 3.85,
  ownProgress: 3.85,
  partOfCollections: ["release/taylor-swift-2-1989", "release/taylor-swift-2-1989-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Style",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "style|06HL4z0CvFAxyc27GXpf02|231000",
  song: "song/taylor-swift-style",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989",
      discNumber: 1,
      position: 3,
      externalId: "4lIxdJw6W3Fg4vUIYCB0S5",
      externalLink: "https://open.spotify.com/track/4lIxdJw6W3Fg4vUIYCB0S5",
    },
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 3,
      externalId: "1fo2ctLqj3zBhRQKOXprol",
      externalLink: "https://open.spotify.com/track/1fo2ctLqj3zBhRQKOXprol",
    },
  ],
} as const satisfies Track
