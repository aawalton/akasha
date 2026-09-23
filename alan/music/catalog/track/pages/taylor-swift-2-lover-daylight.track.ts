import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverDaylight = {
  id: "01a0ce86-7094-7fd8-b5c7-f1e98a9b05a4",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-daylight",
  ownLength: 4.890883333333333,
  ownProgress: 4.890883333333333,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "Daylight",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "daylight|06HL4z0CvFAxyc27GXpf02|293453",
  song: "song/taylor-swift-daylight",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 18,
      externalId: "1fzAuUVbzlhZ1lJAx9PtY6",
      externalLink: "https://open.spotify.com/track/1fzAuUVbzlhZ1lJAx9PtY6",
    },
  ],
} as const satisfies Track
