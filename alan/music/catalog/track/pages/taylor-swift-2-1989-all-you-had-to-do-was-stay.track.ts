import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift21989AllYouHadToDoWasStay = {
  id: "01a0ce86-7ebb-7d9e-9d3d-6f6011198137",
  type: "page-type/track",
  slug: "taylor-swift-2-1989-all-you-had-to-do-was-stay",
  ownLength: 3.22155,
  ownProgress: 3.22155,
  partOfCollections: ["release/taylor-swift-2-1989", "release/taylor-swift-2-1989-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "All You Had To Do Was Stay",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "allyouhadtodowasstay|06HL4z0CvFAxyc27GXpf02|193293",
  song: "song/taylor-swift-all-you-had-to-do-was-stay",
  carriedBy: [
    {
      release: "release/taylor-swift-2-1989",
      discNumber: 1,
      position: 5,
      externalId: "0dAb8TY433dl3ZfXYCLE19",
      externalLink: "https://open.spotify.com/track/0dAb8TY433dl3ZfXYCLE19",
    },
    {
      release: "release/taylor-swift-2-1989-deluxe-edition",
      discNumber: 1,
      position: 5,
      externalId: "0lmMtDQ2ElasKU2qDAE6NN",
      externalLink: "https://open.spotify.com/track/0lmMtDQ2ElasKU2qDAE6NN",
    },
  ],
} as const satisfies Track
