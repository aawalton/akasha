import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteryTheBeachMurder = {
  id: "01a17499-c95c-7867-acbe-46c8c34cb8cb",
  type: "page-type/movie",
  slug: "garage-sale-mystery-the-beach-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 7,
  publishedAt: "2017-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "465286",
      externalLink: "https://www.themoviedb.org/movie/465286",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mystery: The Beach Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt7235362",
  posterPath: "/qlh35VkWmrJUnTGqMvvUnHVbIAK.jpg",
  voteAverage: 6.202,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
