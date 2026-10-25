import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasHomecoming = {
  id: "01a17499-c95b-76a2-915f-9af154ba8274",
  type: "page-type/movie",
  slug: "christmas-homecoming",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "479614",
      externalLink: "https://www.themoviedb.org/movie/479614",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Homecoming",
  genres: ["Drama", "TV Movie", "Romance"],
  imdbId: "tt5944496",
  posterPath: "/6tviM77Kfi2bfvyrMLQ4fAHkz6e.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
