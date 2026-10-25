import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mySecretValentine = {
  id: "01a17499-c95e-7f4a-b98e-ad59d786139b",
  type: "page-type/movie",
  slug: "my-secret-valentine",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2018-02-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "497514",
      externalLink: "https://www.themoviedb.org/movie/497514",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Secret Valentine",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt7905880",
  posterPath: "/zk9I9GiznncJXfW9A4WXooi4zHj.jpg",
  voteAverage: 6.4,
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
