import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioSacredIiElRoySt = {
  id: "01a0c622-132a-7003-9f3c-d2dde45c1d9b",
  type: "page-type/track",
  slug: "jessica-baio-sacred-ii-el-roy-st",
  ownLength: 2.93965,
  ownProgress: 2.93965,
  partOfCollections: ["release/jessica-baio-sacred-ii", "release/jessica-baio-sacred"],
  status: "completed",
  unit: "unit/minutes",
  title: "el roy st.",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "elroyst|0VMFTqmv0hYlWruyBERT95|176379",
  song: "song/jessica-baio-el-roy-st",
  carriedBy: [
    {
      release: "release/jessica-baio-sacred",
      discNumber: 1,
      position: 6,
      externalId: "19iFIlguWVWX1Kj1i7NshQ",
      externalLink: "https://open.spotify.com/track/19iFIlguWVWX1Kj1i7NshQ",
    },
    {
      release: "release/jessica-baio-sacred-ii",
      discNumber: 2,
      position: 6,
      externalId: "6aNRVhRhBpJ0zIM0EgqZDn",
      externalLink: "https://open.spotify.com/track/6aNRVhRhBpJ0zIM0EgqZDn",
    },
  ],
} as const satisfies Track
