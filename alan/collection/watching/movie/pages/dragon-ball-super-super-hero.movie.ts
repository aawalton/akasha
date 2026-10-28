import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dragonBallSuperSuperHero = {
  id: "01a183dc-bd41-7654-9807-6999e998aa16",
  type: "page-type/movie",
  slug: "dragon-ball-super-super-hero",
  ownLength: 100,
  ownProgress: 0,
  partOfCollections: ["fandom/dragon-ball"],
  publishedAt: "2022-06-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "610150",
      externalLink: "https://www.themoviedb.org/movie/610150",
    },
  ],
  title: "Dragon Ball Super: Super Hero",
  createdAt: "2026-10-28T18:54:04.097Z",
  updatedAt: "2026-10-28T18:54:04.097Z",
} as const satisfies Movie
