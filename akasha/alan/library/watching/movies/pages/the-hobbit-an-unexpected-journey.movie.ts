import type { Movie } from "../movie.page-type.ts"

export const theHobbitAnUnexpectedJourney = {
  id: "01a06802-6d9a-7011-a598-f599e1c8c450",
  pageTypeSlug: "movie",
  slug: "the-hobbit-an-unexpected-journey",
  title: "The Hobbit: An Unexpected Journey",
  partOfSlugs: ["the-lord-of-the-rings-shows"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "completed",
  rank: "B",
  publishedAt: "2012-12-14",
  externalLink: "https://trakt.tv/movies/the-hobbit-an-unexpected-journey-2012",
  lastSyncedAt: "2025-10-01",
} as const satisfies Movie
