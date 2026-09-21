import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioCatalystStartOver = {
  id: "01a0c622-22f4-7d26-83af-5c10b677515b",
  type: "page-type/track",
  slug: "jessica-baio-catalyst-start-over",
  ownLength: 3.4151333333333334,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-catalyst", "release/jessica-baio-start-over"],
  status: "not-started",
  unit: "unit/minutes",
  title: "start over",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" },
    { externalId: "42Gj65Q4XQ9hMhLQE5hi7r", artistName: "Mykyl" },
  ],
  trackKey: "startover|0VMFTqmv0hYlWruyBERT95,42Gj65Q4XQ9hMhLQE5hi7r|204908",
  song: "song/jessica-baio-start-over",
  carriedBy: [
    {
      release: "release/jessica-baio-catalyst",
      discNumber: 1,
      position: 5,
      externalId: "5n1xOkVUXU18wqVFTAWuJn",
      externalLink: "https://open.spotify.com/track/5n1xOkVUXU18wqVFTAWuJn",
    },
    {
      release: "release/jessica-baio-start-over",
      discNumber: 1,
      position: 1,
      externalId: "0eIR6YnWODkFj3Xmo8U1e7",
      externalLink: "https://open.spotify.com/track/0eIR6YnWODkFj3Xmo8U1e7",
    },
  ],
} as const satisfies Track
