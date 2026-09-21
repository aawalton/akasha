import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeEveryVersion = {
  id: "01a0c622-17aa-762c-a9d5-33ce28c1dafb",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-every-version",
  ownLength: 2.5509166666666667,
  ownProgress: 2.5509166666666667,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "completed",
  unit: "unit/minutes",
  title: "every version",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "everyversion|0VMFTqmv0hYlWruyBERT95|153055",
  song: "song/jessica-baio-every-version",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 12,
      externalId: "4WKb0ze59QLZt2yreXYVBt",
      externalLink: "https://open.spotify.com/track/4WKb0ze59QLZt2yreXYVBt",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 12,
      externalId: "6nmJiA8NBsfEpUfgzZ5pAM",
      externalLink: "https://open.spotify.com/track/6nmJiA8NBsfEpUfgzZ5pAM",
    },
  ],
} as const satisfies Track
