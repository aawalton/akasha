import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const jessicaBaioIfINeverIfINever = {
  id: "01a0c622-24d8-72e9-9a72-a4a2dbfc3f58",
  type: "page-type/track",
  slug: "jessica-baio-if-i-never-if-i-never",
  ownLength: 2.9374666666666664,
  ownProgress: 0,
  partOfCollections: ["release/jessica-baio-if-i-never"],
  status: "not-started",
  unit: "unit/minutes",
  title: "if i never",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "0VMFTqmv0hYlWruyBERT95", artistName: "Jessica Baio" }],
  trackKey: "ifinever|0VMFTqmv0hYlWruyBERT95|176248",
  song: "song/jessica-baio-if-i-never",
  carriedBy: [
    {
      release: "release/jessica-baio-if-i-never",
      discNumber: 1,
      position: 1,
      externalId: "72bcYTJEHG7tNIdhmUYGht",
      externalLink: "https://open.spotify.com/track/72bcYTJEHG7tNIdhmUYGht",
    },
  ],
} as const satisfies Track
