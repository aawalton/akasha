import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedTheLuckyOne = {
  id: "01a0ce86-85ae-7d7b-9b5b-beb2a45148e0",
  type: "page-type/track",
  slug: "taylor-swift-2-red-the-lucky-one",
  ownLength: 4.0022166666666665,
  ownProgress: 4.0022166666666665,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Lucky One",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "theluckyone|06HL4z0CvFAxyc27GXpf02|240133",
  song: "song/taylor-swift-the-lucky-one",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 13,
      externalId: "2X2J0BhxaLTmnxO4pPUhSd",
      externalLink: "https://open.spotify.com/track/2X2J0BhxaLTmnxO4pPUhSd",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 13,
      externalId: "2wtHlpYSgC7xEdD3DrSHNL",
      externalLink: "https://open.spotify.com/track/2wtHlpYSgC7xEdD3DrSHNL",
    },
  ],
} as const satisfies Track
