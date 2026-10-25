import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const deadOverHeelsAnAuroraTeagardenMystery = {
  id: "01a17499-c95b-73bb-baa7-dfec3d41e424",
  type: "page-type/movie",
  slug: "dead-over-heels-an-aurora-teagarden-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 4,
  publishedAt: "2017-03-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "436398",
      externalLink: "https://www.themoviedb.org/movie/436398",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Dead Over Heels: An Aurora Teagarden Mystery",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt6543048",
  posterPath: "/p6TUrrWS9R2pNGRw7NMw2cyLqkv.jpg",
  voteAverage: 7,
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
