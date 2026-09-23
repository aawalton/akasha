import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationGorgeous = {
  id: "01a0ce86-73d2-74cb-9395-ea89669565fd",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-gorgeous",
  ownLength: 3.494666666666667,
  ownProgress: 3.494666666666667,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gorgeous",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "gorgeous|06HL4z0CvFAxyc27GXpf02|209680",
  song: "song/taylor-swift-gorgeous",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 8,
      externalId: "1ZY1PqizIl78geGM4xWlEA",
      externalLink: "https://open.spotify.com/track/1ZY1PqizIl78geGM4xWlEA",
    },
  ],
} as const satisfies Track
