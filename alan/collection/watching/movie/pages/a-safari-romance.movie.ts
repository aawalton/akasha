import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aSafariRomance = {
  id: "01a1749a-66bb-77ca-8cf8-ed51817f97a6",
  type: "page-type/movie",
  slug: "a-safari-romance",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2023-08-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1128618",
      externalLink: "https://www.themoviedb.org/movie/1128618",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Safari Romance",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt12962240",
  posterPath: "/wowRkAQ8PzkmZXswtQhMMRZ5UAP.jpg",
  voteAverage: 7.1,
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
