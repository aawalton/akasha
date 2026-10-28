import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const freeTheFinalStrokeTheFirstVolume = {
  id: "01a183d7-d63f-72b7-9e71-8210ea0f58fa",
  type: "page-type/movie",
  slug: "free-the-final-stroke-the-first-volume",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["fandom/free"],
  publishedAt: "2021-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "738091",
      externalLink: "https://www.themoviedb.org/movie/738091",
    },
  ],
  title: "Free! the Final Stroke the First Volume",
  createdAt: "2026-10-28T18:48:42.815Z",
  updatedAt: "2026-10-28T18:48:42.815Z",
} as const satisfies Movie
