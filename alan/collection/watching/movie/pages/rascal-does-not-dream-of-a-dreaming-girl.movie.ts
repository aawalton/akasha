import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const rascalDoesNotDreamOfADreamingGirl = {
  id: "01a183d5-a7fa-708a-9200-cfba9389088d",
  type: "page-type/movie",
  slug: "rascal-does-not-dream-of-a-dreaming-girl",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["fandom/rascal-does-not-dream"],
  publishedAt: "2019-06-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "572154",
      externalLink: "https://www.themoviedb.org/movie/572154",
    },
  ],
  title: "Rascal Does Not Dream of a Dreaming Girl",
  createdAt: "2026-10-28T18:46:19.898Z",
  updatedAt: "2026-10-28T18:46:19.898Z",
} as const satisfies Movie
