import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theHobbitAnUnexpectedJourney = {
  id: "01a06802-6d9a-7011-a598-f599e1c8c450",
  type: "page-type/movie",
  slug: "the-hobbit-an-unexpected-journey",
  title: "The Hobbit: An Unexpected Journey",
  partOfCollections: ["show-collection/the-lord-of-the-rings-shows"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "2012-12-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/the-hobbit-an-unexpected-journey-2012",
      lastSyncedAt: "2025-10-01",
    },
  ],
} as const satisfies Movie
