import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const autumnDreams = {
  id: "01a17499-8944-7a06-b83f-ae1e6a59ee9e",
  type: "page-type/movie",
  slug: "autumn-dreams",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "361745",
      externalLink: "https://www.themoviedb.org/movie/361745",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Autumn Dreams",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt5066870",
  posterPath: "/rqhBCMzRU6DPhoMIB07bXYcsPNh.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "VIX ",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
