import type { Movie } from "../movie.page-type.ts"

export const theHobbitTheBattleOfTheFiveArmies = {
  id: "01a06802-6d9a-7012-83d5-4ff0dbb6f889",
  pageTypeSlug: "movie",
  slug: "the-hobbit-the-battle-of-the-five-armies",
  title: "The Hobbit: The Battle of the Five Armies",
  partOfSlugs: ["the-lord-of-the-rings-shows"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2014-12-17",
  externalLink: "https://trakt.tv/movies/the-hobbit-the-battle-of-the-five-armies-2014",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
