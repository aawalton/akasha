import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dragonBallZResurrectionF = {
  id: "01a183dc-7a52-7751-9e2a-3b6b1457f3be",
  type: "page-type/movie",
  slug: "dragon-ball-z-resurrection-f",
  ownLength: 93,
  ownProgress: 0,
  partOfCollections: ["fandom/dragon-ball"],
  publishedAt: "2015-04-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "303857",
      externalLink: "https://www.themoviedb.org/movie/303857",
    },
  ],
  title: "Dragon Ball Z: Resurrection 'F'",
  createdAt: "2026-10-28T18:53:46.962Z",
  updatedAt: "2026-10-28T18:53:46.962Z",
} as const satisfies Movie
