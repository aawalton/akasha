import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessPlatinumEditionLoveStory = {
  id: "01a0ce86-9260-7c51-b3af-0816aa431331",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-platinum-edition-love-story",
  ownLength: 3.921333333333333,
  ownProgress: 3.921333333333333,
  partOfCollections: ["release/taylor-swift-2-fearless-platinum-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Love Story",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "lovestory|06HL4z0CvFAxyc27GXpf02|235280",
  song: "song/taylor-swift-love-story",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless-platinum-edition",
      discNumber: 1,
      position: 9,
      externalId: "0kN3oXYWWAk1uC0y2WoyOE",
      externalLink: "https://open.spotify.com/track/0kN3oXYWWAk1uC0y2WoyOE",
    },
  ],
} as const satisfies Track
