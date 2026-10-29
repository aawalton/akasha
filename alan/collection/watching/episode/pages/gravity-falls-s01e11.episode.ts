import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const gravityFallsS01e11 = {
  id: "01a18849-545d-7058-aad0-ba6ff6e484c5",
  type: "page-type/episode",
  slug: "gravity-falls-s01e11",
  description:
    "Dipper is self-conscious that Mabel is taller than him and seeks a magic solution. Meanwhile Lil' Gideon takes advantage of Dipper's and Mabel's height discrepancy.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/gravity-falls-season-1"],
  position: 11,
  publishedAt: "2012-09-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "871291",
      externalLink: "https://www.themoviedb.org/tv/40075/season/1/episode/11",
    },
  ],
  title: "Little Dipper",
  episodeType: "standard",
  stillPath: "/A3OkkE2jSgqqhmCj8FIVJDDDuGC.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:31:09.532Z",
  updatedAt: "2026-10-29T15:31:09.532Z",
} as const satisfies Episode
