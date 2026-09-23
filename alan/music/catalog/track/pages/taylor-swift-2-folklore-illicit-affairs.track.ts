import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FolkloreIllicitAffairs = {
  id: "01a0ce86-6ca7-7af5-ac3d-942fb548eb68",
  type: "page-type/track",
  slug: "taylor-swift-2-folklore-illicit-affairs",
  ownLength: 3.1816333333333335,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-folklore"],
  status: "not-started",
  unit: "unit/minutes",
  title: "illicit affairs",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "illicitaffairs|06HL4z0CvFAxyc27GXpf02|190898",
  song: "song/taylor-swift-illicit-affairs",
  carriedBy: [
    {
      release: "release/taylor-swift-2-folklore",
      discNumber: 1,
      position: 10,
      externalId: "2NmsngXHeC1GQ9wWrzhOMf",
      externalLink: "https://open.spotify.com/track/2NmsngXHeC1GQ9wWrzhOMf",
    },
  ],
} as const satisfies Track
