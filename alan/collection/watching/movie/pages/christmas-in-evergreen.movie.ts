import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInEvergreen = {
  id: "01a17499-c95b-7f68-a41e-c5951afe1b18",
  type: "page-type/movie",
  slug: "christmas-in-evergreen",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/christmas-in-evergreen"],
  position: 0,
  publishedAt: "2017-12-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "474977",
      externalLink: "https://www.themoviedb.org/movie/474977",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Evergreen",
  genres: ["Romance", "TV Movie", "Drama"],
  imdbId: "tt7440948",
  posterPath: "/eLeWrVjdFmgwUtPBGHmv2w8YfjO.jpg",
  voteAverage: 6.362,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
