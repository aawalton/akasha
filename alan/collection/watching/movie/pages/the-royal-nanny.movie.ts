import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theRoyalNanny = {
  id: "01a1749a-464e-7676-acf2-4538c89a9c16",
  type: "page-type/movie",
  slug: "the-royal-nanny",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-11-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028182",
      externalLink: "https://www.themoviedb.org/movie/1028182",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Royal Nanny",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22247450",
  posterPath: "/svpc5CdExIpsNkX091K70HY8gpm.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
