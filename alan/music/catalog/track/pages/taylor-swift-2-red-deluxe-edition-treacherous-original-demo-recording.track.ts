import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedDeluxeEditionTreacherousOriginalDemoRecording = {
  id: "01a0ce86-86ca-7612-bbea-d7d566e3e372",
  type: "page-type/track",
  slug: "taylor-swift-2-red-deluxe-edition-treacherous-original-demo-recording",
  ownLength: 3.9953333333333334,
  ownProgress: 3.9953333333333334,
  partOfCollections: ["release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Treacherous - Original Demo Recording",
  trackType: "demo",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "treacherousoriginaldemorecording|06HL4z0CvFAxyc27GXpf02|239720",
  song: "song/taylor-swift-treacherous",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 20,
      externalId: "7BT9K9BDqq6HI2oWH5UMZQ",
      externalLink: "https://open.spotify.com/track/7BT9K9BDqq6HI2oWH5UMZQ",
    },
  ],
} as const satisfies Track
