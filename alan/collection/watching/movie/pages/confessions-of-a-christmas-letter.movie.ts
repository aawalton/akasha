import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const confessionsOfAChristmasLetter = {
  id: "01a1749a-89a7-7457-99b0-2282275bf755",
  type: "page-type/movie",
  slug: "confessions-of-a-christmas-letter",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-11-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1361141",
      externalLink: "https://www.themoviedb.org/movie/1361141",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Confessions of a Christmas Letter",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33401152",
  posterPath: "/2wJnPgWT2A4OVqyUgsQAGbij9FY.jpg",
  voteAverage: 5.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
