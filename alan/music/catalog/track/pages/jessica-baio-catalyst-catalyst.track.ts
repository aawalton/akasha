import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioCatalystCatalyst = {
  id: "01a0c622-17d7-7bd3-97e9-eca29fd2bc4f",
  type: "page-type/track",
  slug: "jessica-baio-catalyst-catalyst",
  ownLength: 0.6430166666666667,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-catalyst"],
  status: "not-started",
  unit: "unit/minutes",
  title: "catalyst",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "catalyst|0VMFTqmv0hYlWruyBERT95|38581",
  song: "song/jessica-baio-catalyst",
  carriedBy: [
    {
      release: "release/jessica-baio-catalyst",
      discNumber: 1,
      position: 1,
      externalId: "29ofVqlr6fZOsk9KXrWyUc",
      externalLink: "https://open.spotify.com/track/29ofVqlr6fZOsk9KXrWyUc",
    },
  ],
} as const satisfies Track
