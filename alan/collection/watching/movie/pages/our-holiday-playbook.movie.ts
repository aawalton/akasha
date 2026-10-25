import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const ourHolidayPlaybook = {
  id: "01a1749a-c86a-756a-b930-26e92710d858",
  type: "page-type/movie",
  slug: "our-holiday-playbook",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-11-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1773334",
      externalLink: "https://www.themoviedb.org/movie/1773334",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Our Holiday Playbook",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt46076042",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
