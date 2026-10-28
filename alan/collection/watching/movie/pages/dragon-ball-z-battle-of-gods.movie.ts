import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dragonBallZBattleOfGods = {
  id: "01a183dc-6d83-7ef2-a054-728dc56af3f4",
  type: "page-type/movie",
  slug: "dragon-ball-z-battle-of-gods",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["fandom/dragon-ball"],
  publishedAt: "2013-03-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "126963",
      externalLink: "https://www.themoviedb.org/movie/126963",
    },
  ],
  title: "Dragon Ball Z: Battle of Gods",
  createdAt: "2026-10-28T18:53:43.683Z",
  updatedAt: "2026-10-28T18:53:43.683Z",
} as const satisfies Movie
