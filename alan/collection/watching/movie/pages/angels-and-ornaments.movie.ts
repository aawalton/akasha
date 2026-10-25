import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const angelsAndOrnaments = {
  id: "01a17499-8944-7d05-a3fa-23f8a1fd4173",
  type: "page-type/movie",
  slug: "angels-and-ornaments",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-11-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299581",
      externalLink: "https://www.themoviedb.org/movie/299581",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Angels and Ornaments",
  genres: ["TV Movie", "Romance", "Family"],
  imdbId: "tt4160132",
  posterPath: "/eyyj4aWSeG6TFI4om8KAnowaQGM.jpg",
  voteAverage: 5.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
