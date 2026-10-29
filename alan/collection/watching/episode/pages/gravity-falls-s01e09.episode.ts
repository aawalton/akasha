import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e09 = {
  id: "01a18849-545d-761c-8a61-a26970c368c3",
  type: "page-type/episode",
  slug: "gravity-falls-s01e09",
  description:
    "Dipper wants to correct a mistake he made in the past with assistance from a time machine. Mabel is overjoyed when she wins a pet pig at a fair.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 9,
  publishedAt: "2012-08-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871289",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/9",
    },
  ],
  title: "The Time Traveler's Pig",
  episodeType: "standard",
  stillPath: "/paeKQn9QeaMvFzSSBR1tGHdidAV.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
