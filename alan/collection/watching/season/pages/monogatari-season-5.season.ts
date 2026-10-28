import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const monogatariSeason5 = {
  id: "01a183db-793e-72bc-b0a8-14743aea2124",
  type: "page-type/season",
  slug: "monogatari-season-5",
  description:
    "After graduating from high school, the story of Koyomi Araragi came to an end. This time, it truly ended. However, the story of the girls who were saved by Araragi was not over. It is a prequel, or perhaps a sequel to their struggles in youth.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/monogatari"],
  position: 5,
  publishedAt: "2024-07-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "400986",
      externalLink: "https://www.themoviedb.org/tv/46195/season/5",
    },
  ],
  title: "MONOGATARI Series OFF & MONSTER Season",
  posterPath: "/pSxEbyqv4WFPj5NUeDDx0rdB8fC.jpg",
  voteAverage: 9.6,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Season
