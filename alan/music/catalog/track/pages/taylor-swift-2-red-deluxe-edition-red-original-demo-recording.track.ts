import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedDeluxeEditionRedOriginalDemoRecording = {
  id: "01a0ce86-86f0-7240-95de-cdf3b0e3ec79",
  type: "page-type/track",
  slug: "taylor-swift-2-red-deluxe-edition-red-original-demo-recording",
  ownLength: 3.771333333333333,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-red-deluxe-edition"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Red - Original Demo Recording",
  trackType: "demo",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "redoriginaldemorecording|06HL4z0CvFAxyc27GXpf02|226280",
  song: "song/taylor-swift-red",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 21,
      externalId: "4mqgn90sCeVSYqcoftTQTd",
      externalLink: "https://open.spotify.com/track/4mqgn90sCeVSYqcoftTQTd",
    },
  ],
} as const satisfies Track
