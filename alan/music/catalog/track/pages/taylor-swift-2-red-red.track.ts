import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedRed = {
  id: "01a0ce86-83f7-7e91-8dbc-1c6ac6f65c71",
  type: "page-type/track",
  slug: "taylor-swift-2-red-red",
  ownLength: 3.6804333333333332,
  ownProgress: 3.6804333333333332,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Red",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "red|06HL4z0CvFAxyc27GXpf02|220826",
  song: "song/taylor-swift-red",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 2,
      externalId: "0cITLOYn1Sv4q27zZPqlNK",
      externalLink: "https://open.spotify.com/track/0cITLOYn1Sv4q27zZPqlNK",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 2,
      externalId: "1RvQQGwaPipiNgz8RXAKA8",
      externalLink: "https://open.spotify.com/track/1RvQQGwaPipiNgz8RXAKA8",
    },
  ],
} as const satisfies Track
