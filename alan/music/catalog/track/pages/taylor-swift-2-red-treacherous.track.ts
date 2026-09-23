import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedTreacherous = {
  id: "01a0ce86-841f-70d5-9f72-180af5a5bd01",
  type: "page-type/track",
  slug: "taylor-swift-2-red-treacherous",
  ownLength: 4.012883333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Treacherous",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "treacherous|06HL4z0CvFAxyc27GXpf02|240773",
  song: "song/taylor-swift-treacherous",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 3,
      externalId: "5kYFVSQoPu7yRpfiHBwMUk",
      externalLink: "https://open.spotify.com/track/5kYFVSQoPu7yRpfiHBwMUk",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 3,
      externalId: "0XfOV7qY3834QpFVwOb6CC",
      externalLink: "https://open.spotify.com/track/0XfOV7qY3834QpFVwOb6CC",
    },
  ],
} as const satisfies Track
