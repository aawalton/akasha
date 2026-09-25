import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theHobbitTheBattleOfTheFiveArmies = {
  id: "01a06802-6d9a-7012-83d5-4ff0dbb6f889",
  type: "page-type/movie",
  slug: "the-hobbit-the-battle-of-the-five-armies",
  title: "The Hobbit: The Battle of the Five Armies",
  partOfCollections: ["show-collection/the-lord-of-the-rings-shows"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2014-12-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-hobbit-the-battle-of-the-five-armies-2014",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
