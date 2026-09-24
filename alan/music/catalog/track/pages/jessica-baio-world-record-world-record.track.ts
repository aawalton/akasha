import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioWorldRecordWorldRecord = {
  id: "01a0c622-251f-7fe8-b7ee-00f6c597b394",
  type: "page-type/track",
  slug: "jessica-baio-world-record-world-record",
  ownLength: 3.0238,
  ownProgress: 3.0238,
  partOfCollections: ["release/jessica-baio-world-record"],
  status: "completed",
  unit: "unit/minutes",
  title: "world record",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/jessica-baio" }],
  trackKey: "worldrecord|0VMFTqmv0hYlWruyBERT95|181428",
  song: "song/jessica-baio-world-record",
  carriedBy: [
    {
      release: "release/jessica-baio-world-record",
      discNumber: 1,
      position: 1,
      externalId: "7uQn9MKBZSkITwIOAOAeph",
      externalLink: "https://open.spotify.com/track/7uQn9MKBZSkITwIOAOAeph",
    },
  ],
} as const satisfies Track
