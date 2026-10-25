import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const murderSheBakedJustDesserts = {
  id: "01a17499-c95e-74a9-b75a-5624f11b3d77",
  type: "page-type/movie",
  slug: "murder-she-baked-just-desserts",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 5,
  publishedAt: "2017-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "436401",
      externalLink: "https://www.themoviedb.org/movie/436401",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Murder, She Baked: Just Desserts",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt6682134",
  posterPath: "/s9B67nXWHR7fwv9tZwEeriSn2II.jpg",
  voteAverage: 6.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T20:45:07.643Z",
} as const satisfies Movie
