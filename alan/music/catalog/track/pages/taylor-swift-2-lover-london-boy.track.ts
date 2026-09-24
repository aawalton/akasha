import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverLondonBoy = {
  id: "01a0ce86-6f6f-713e-866d-16a98d9a2c4c",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-london-boy",
  ownLength: 3.1706666666666665,
  ownProgress: 3.1706666666666665,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "London Boy",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "londonboy|06HL4z0CvFAxyc27GXpf02|190240",
  song: "song/taylor-swift-london-boy",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 11,
      externalId: "1LLXZFeAHK9R4xUramtUKw",
      externalLink: "https://open.spotify.com/track/1LLXZFeAHK9R4xUramtUKw",
    },
  ],
} as const satisfies Track
