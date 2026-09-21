import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioGoneGone = {
  id: "01a0c622-244d-7095-9cea-88419febbceb",
  type: "page-type/track",
  slug: "jessica-baio-gone-gone",
  ownLength: 3.193583333333333,
  ownProgress: 3.193583333333333,
  partOfCollections: ["release/jessica-baio-gone"],
  status: "completed",
  unit: "unit/minutes",
  title: "gone",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "gone|0VMFTqmv0hYlWruyBERT95|191615",
  song: "song/jessica-baio-gone",
  carriedBy: [
    {
      release: "release/jessica-baio-gone",
      discNumber: 1,
      position: 1,
      externalId: "554Rmj0Q7hfs8INXwhuuOv",
      externalLink: "https://open.spotify.com/track/554Rmj0Q7hfs8INXwhuuOv",
    },
  ],
} as const satisfies Track
