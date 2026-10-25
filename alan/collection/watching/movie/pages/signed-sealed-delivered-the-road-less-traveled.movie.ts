import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const signedSealedDeliveredTheRoadLessTraveled = {
  id: "01a17499-e806-7eea-a429-2665a3f36489",
  type: "page-type/movie",
  slug: "signed-sealed-delivered-the-road-less-traveled",
  ownLength: 82,
  ownProgress: 0,
  partOfCollections: ["franchise/signed-sealed-delivered"],
  position: 12,
  publishedAt: "2018-02-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "483180",
      externalLink: "https://www.themoviedb.org/movie/483180",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Signed, Sealed, Delivered: The Road Less Traveled",
  genres: ["TV Movie", "Drama", "Comedy"],
  imdbId: "tt7942116",
  posterPath: "/a5LAlfAEgxQA4VEjwRM1Ff8CnVh.jpg",
  voteAverage: 7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T20:45:10.655Z",
} as const satisfies Movie
