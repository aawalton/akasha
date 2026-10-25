import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const merryChristmasTedCooper = {
  id: "01a1749a-a94b-76a9-8709-aa7fd35ccabc",
  type: "page-type/movie",
  slug: "merry-christmas-ted-cooper",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2025-10-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1547882",
      externalLink: "https://www.themoviedb.org/movie/1547882",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Merry Christmas, Ted Cooper!",
  genres: ["Romance", "Comedy", "TV Movie"],
  imdbId: "tt37263154",
  posterPath: "/cdPfcMltESmaYukwnDqvDcqEJUF.jpg",
  voteAverage: 7.237,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
