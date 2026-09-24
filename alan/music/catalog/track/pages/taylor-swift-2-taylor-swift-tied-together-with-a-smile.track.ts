import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftTiedTogetherWithASmile = {
  id: "01a0ce86-9623-782d-9cc8-3e8d2de4ae25",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-tied-together-with-a-smile",
  ownLength: 4.1351,
  ownProgress: 4.1351,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "Tied Together with a Smile",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "tiedtogetherwithasmile|06HL4z0CvFAxyc27GXpf02|248106",
  song: "song/taylor-swift-tied-together-with-a-smile",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 7,
      externalId: "6K0CJLVXqbGMeJSmJ4ENKK",
      externalLink: "https://open.spotify.com/track/6K0CJLVXqbGMeJSmJ4ENKK",
    },
  ],
} as const satisfies Track
