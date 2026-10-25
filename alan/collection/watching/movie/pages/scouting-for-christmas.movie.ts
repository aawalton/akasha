import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const scoutingForChristmas = {
  id: "01a1749a-89aa-78fc-bcd2-08bbd188b4b5",
  type: "page-type/movie",
  slug: "scouting-for-christmas",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2024-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1359800",
      externalLink: "https://www.themoviedb.org/movie/1359800",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Scouting for Christmas",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt33428925",
  posterPath: "/xKvDbiMmZaX0jJuMrH0qvZVoCAq.jpg",
  voteAverage: 6.9,
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
