import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theChristmasBaby = {
  id: "01a1749a-c86b-7228-808d-cd7b7a8808d0",
  type: "page-type/movie",
  slug: "the-christmas-baby",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-12-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547929",
      externalLink: "https://www.themoviedb.org/movie/1547929",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Christmas Baby",
  genres: ["Romance"],
  imdbId: "tt36963465",
  posterPath: "/6PSxu99G31ipYwlK6cYS0CNQGv3.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
