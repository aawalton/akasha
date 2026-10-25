import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const unleashingMrDarcy = {
  id: "01a17499-a7d8-7a53-9eb7-bd73ef0a646f",
  type: "page-type/movie",
  slug: "unleashing-mr-darcy",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/mr-darcy"],
  position: 0,
  publishedAt: "2016-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "374609",
      externalLink: "https://www.themoviedb.org/movie/374609",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Unleashing Mr. Darcy",
  genres: ["Romance", "TV Movie", "Comedy"],
  imdbId: "tt5231268",
  posterPath: "/2sm6ifWF8XBIu2BhQ39VdJflS4t.jpg",
  voteAverage: 5.578,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
