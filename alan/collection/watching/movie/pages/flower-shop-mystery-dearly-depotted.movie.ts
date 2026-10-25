import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const flowerShopMysteryDearlyDepotted = {
  id: "01a17499-a7d4-78b6-bc63-00fb19924fed",
  type: "page-type/movie",
  slug: "flower-shop-mystery-dearly-depotted",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/flower-shop-mystery"],
  position: 2,
  publishedAt: "2016-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "398356",
      externalLink: "https://www.themoviedb.org/movie/398356",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Flower Shop Mystery: Dearly Depotted",
  genres: ["TV Movie", "Mystery", "Crime", "Romance"],
  imdbId: "tt5541330",
  posterPath: "/wq9Vine2xE8SqqGwfTA1HzRvaWC.jpg",
  voteAverage: 6.5,
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
