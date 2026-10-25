import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasBedtimeStories = {
  id: "01a1749a-66bc-77ca-9374-d97540923c6e",
  type: "page-type/movie",
  slug: "christmas-bedtime-stories",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2022-10-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1027431",
      externalLink: "https://www.themoviedb.org/movie/1027431",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Bedtime Stories",
  genres: ["TV Movie", "Comedy", "Drama", "Romance"],
  imdbId: "tt22258178",
  posterPath: "/zhW480dt2LCJH0PcoDeFkw4nFnh.jpg",
  voteAverage: 5.8,
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
