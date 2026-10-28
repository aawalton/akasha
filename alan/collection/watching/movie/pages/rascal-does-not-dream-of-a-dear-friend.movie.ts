import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rascalDoesNotDreamOfADearFriend = {
  id: "01a183d5-b725-7709-aa43-4469fafc9856",
  type: "page-type/movie",
  slug: "rascal-does-not-dream-of-a-dear-friend",
  ownLength: 118,
  ownProgress: 0,
  partOfCollections: ["fandom/rascal-does-not-dream"],
  publishedAt: "2026-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1553200",
      externalLink: "https://www.themoviedb.org/movie/1553200",
    },
  ],
  title: "Rascal Does Not Dream of a Dear Friend",
  createdAt: "2026-10-28T18:46:23.781Z",
  updatedAt: "2026-10-28T18:46:23.781Z",
} as const satisfies Movie
