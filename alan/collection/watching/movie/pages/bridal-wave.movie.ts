import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const bridalWave = {
  id: "01a17499-8944-76b7-98ce-467f1c036d7c",
  type: "page-type/movie",
  slug: "bridal-wave",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2015-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "317114",
      externalLink: "https://www.themoviedb.org/movie/317114",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Bridal Wave",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt4368496",
  posterPath: "/yZMUAsU9MxTDls737iU23XeywND.jpg",
  voteAverage: 6.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Plex",
    "Plex Channel",
    "Tubi TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
