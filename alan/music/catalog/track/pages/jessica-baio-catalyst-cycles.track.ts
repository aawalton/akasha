import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioCatalystCycles = {
  id: "01a0c622-1800-7d66-9485-97806d8eb342",
  type: "page-type/track",
  slug: "jessica-baio-catalyst-cycles",
  ownLength: 3.3059833333333333,
  ownProgress: 3.3059833333333333,
  partOfCollections: ["release/jessica-baio-catalyst"],
  status: "completed",
  unit: "unit/minutes",
  title: "cycles",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "cycles|0VMFTqmv0hYlWruyBERT95|198359",
  song: "song/jessica-baio-cycles",
  carriedBy: [
    {
      release: "release/jessica-baio-catalyst",
      discNumber: 1,
      position: 2,
      externalId: "1wk1JO5hus8bXb1LFzOhWs",
      externalLink: "https://open.spotify.com/track/1wk1JO5hus8bXb1LFzOhWs",
    },
  ],
} as const satisfies Track
