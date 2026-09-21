import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioCatalystLethal = {
  id: "01a0c622-231b-7b2b-8585-01f4cd8564c3",
  type: "page-type/track",
  slug: "jessica-baio-catalyst-lethal",
  ownLength: 2.7762166666666666,
  ownProgress: 2.7762166666666666,
  partOfCollections: ["release/jessica-baio-catalyst", "release/jessica-baio-lethal"],
  status: "completed",
  unit: "unit/minutes",
  title: "lethal",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "lethal|0VMFTqmv0hYlWruyBERT95|166573",
  song: "song/jessica-baio-lethal",
  carriedBy: [
    {
      release: "release/jessica-baio-catalyst",
      discNumber: 1,
      position: 3,
      externalId: "1AC87b3iusn26WLdqJO6Nn",
      externalLink: "https://open.spotify.com/track/1AC87b3iusn26WLdqJO6Nn",
    },
    {
      release: "release/jessica-baio-lethal",
      discNumber: 1,
      position: 1,
      externalId: "1qnwBI3oruFZBAbmiHTLrT",
      externalLink: "https://open.spotify.com/track/1qnwBI3oruFZBAbmiHTLrT",
    },
  ],
} as const satisfies Track
