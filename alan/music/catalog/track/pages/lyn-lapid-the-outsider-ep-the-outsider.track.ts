import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lynLapidTheOutsiderEpTheOutsider = {
  id: "01a0c95e-c16a-7793-8faf-565eb721a487",
  type: "page-type/track",
  slug: "lyn-lapid-the-outsider-ep-the-outsider",
  ownLength: 3.01,
  ownProgress: 3.01,
  partOfCollections: ["release/lyn-lapid-the-outsider-ep"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Outsider",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "4pfy05cNNTacuOQ6SiSu4v", artistName: "Lyn Lapid" }],
  trackKey: "theoutsider|4pfy05cNNTacuOQ6SiSu4v|180600",
  song: "song/lyn-lapid-the-outsider",
  carriedBy: [
    {
      release: "release/lyn-lapid-the-outsider-ep",
      discNumber: 1,
      position: 8,
      externalId: "51LpurBL96CWGg09naDpRl",
      externalLink: "https://open.spotify.com/track/51LpurBL96CWGg09naDpRl",
    },
  ],
} as const satisfies Track
