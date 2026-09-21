import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeUnoptimistic = {
  id: "01a0c622-1677-7433-99cc-6ed101877336",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-unoptimistic",
  ownLength: 2.442816666666667,
  ownProgress: 2.442816666666667,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "completed",
  unit: "unit/minutes",
  title: "unoptimistic",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "unoptimistic|0VMFTqmv0hYlWruyBERT95|146569",
  song: "song/jessica-baio-unoptimistic",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 5,
      externalId: "3QgIDS2zh9GM3pkMbvXNbY",
      externalLink: "https://open.spotify.com/track/3QgIDS2zh9GM3pkMbvXNbY",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 5,
      externalId: "2vRfGkK3DcWI1h6tIK880I",
      externalLink: "https://open.spotify.com/track/2vRfGkK3DcWI1h6tIK880I",
    },
  ],
} as const satisfies Track
