import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasIsland = {
  id: "01a1749a-66bc-754e-baf5-0a64d363b134",
  type: "page-type/movie",
  slug: "christmas-island",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1180841",
      externalLink: "https://www.themoviedb.org/movie/1180841",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Island",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt29378386",
  posterPath: "/Aw3ApBYlH0KIJ377vcUiqbPMth5.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
