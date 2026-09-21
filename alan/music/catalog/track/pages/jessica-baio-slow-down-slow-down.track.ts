import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSlowDownSlowDown = {
  id: "01a0c622-1e27-7779-b29c-a44a1685bd9a",
  type: "page-type/track",
  slug: "jessica-baio-slow-down-slow-down",
  ownLength: 2.47105,
  ownProgress: 2.47105,
  partOfCollections: ["release/jessica-baio-slow-down"],
  status: "completed",
  unit: "unit/minutes",
  title: "SLOW DOWN",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "slowdown|0VMFTqmv0hYlWruyBERT95|148263",
  song: "song/jessica-baio-slow-down",
  carriedBy: [
    {
      release: "release/jessica-baio-slow-down",
      discNumber: 1,
      position: 1,
      externalId: "0RnKHcb6dnWIBBuiipNx2o",
      externalLink: "https://open.spotify.com/track/0RnKHcb6dnWIBBuiipNx2o",
    },
  ],
} as const satisfies Track
