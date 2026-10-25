import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const threeBedroomsOneCorpseAnAuroraTeagardenMystery = {
  id: "01a17499-a7d8-7aad-99eb-d438266b0458",
  type: "page-type/movie",
  slug: "three-bedrooms-one-corpse-an-aurora-teagarden-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/aurora-teagarden-mystery"],
  position: 2,
  publishedAt: "2016-06-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "393737",
      externalLink: "https://www.themoviedb.org/movie/393737",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Three Bedrooms, One Corpse: An Aurora Teagarden Mystery",
  genres: ["Mystery", "TV Movie", "Crime", "Drama"],
  imdbId: "tt5790274",
  posterPath: "/wRkZigA3uI3iqlTo1E024doHOps.jpg",
  voteAverage: 6.7,
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
