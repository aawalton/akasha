import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioUnsaidDeluxeUnsaid = {
  id: "01a0c622-1756-7267-b17f-f5335a00f0cb",
  type: "page-type/track",
  slug: "jessica-baio-unsaid-deluxe-unsaid",
  ownLength: 2.662533333333333,
  ownProgress: 2.662533333333333,
  partOfCollections: ["release/jessica-baio-unsaid-deluxe", "release/jessica-baio-unsaid"],
  status: "completed",
  unit: "unit/minutes",
  title: "unsaid",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "unsaid|0VMFTqmv0hYlWruyBERT95|159752",
  song: "song/jessica-baio-unsaid",
  carriedBy: [
    {
      release: "release/jessica-baio-unsaid",
      discNumber: 1,
      position: 10,
      externalId: "5u1U7DzPiG2el25Njae5Tf",
      externalLink: "https://open.spotify.com/track/5u1U7DzPiG2el25Njae5Tf",
    },
    {
      release: "release/jessica-baio-unsaid-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "3q2WMQG6PBSwC1ICNnrMZo",
      externalLink: "https://open.spotify.com/track/3q2WMQG6PBSwC1ICNnrMZo",
    },
  ],
} as const satisfies Track
