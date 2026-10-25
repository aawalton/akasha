import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const undercoverHoliday = {
  id: "01a1749a-464f-7d09-aeae-13cfcd5bda25",
  type: "page-type/movie",
  slug: "undercover-holiday",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1028544",
      externalLink: "https://www.themoviedb.org/movie/1028544",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Undercover Holiday",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22295902",
  posterPath: "/wVD5PIVEBjlGSlzf8AtIPAoTWvT.jpg",
  voteAverage: 6.2,
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
