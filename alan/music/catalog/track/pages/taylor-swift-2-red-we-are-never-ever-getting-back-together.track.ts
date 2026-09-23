import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedWeAreNeverEverGettingBackTogether = {
  id: "01a0ce86-84ea-74c6-b485-64eb13b01285",
  type: "page-type/track",
  slug: "taylor-swift-2-red-we-are-never-ever-getting-back-together",
  ownLength: 3.198,
  ownProgress: 3.198,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "We Are Never Ever Getting Back Together",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "weareneverevergettingbacktogether|06HL4z0CvFAxyc27GXpf02|191880",
  song: "song/taylor-swift-we-are-never-ever-getting-back-together",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 8,
      externalId: "7AEAGTc8cReDqcbPoY9gwo",
      externalLink: "https://open.spotify.com/track/7AEAGTc8cReDqcbPoY9gwo",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 8,
      externalId: "1OYARuagDrpgNNQ4loO1Cs",
      externalLink: "https://open.spotify.com/track/1OYARuagDrpgNNQ4loO1Cs",
    },
  ],
} as const satisfies Track
