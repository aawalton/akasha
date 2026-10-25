import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const flowerShopMysteryMumSTheWord = {
  id: "01a17499-a7d4-7bad-ad14-0b76c164a74a",
  type: "page-type/movie",
  slug: "flower-shop-mystery-mum-s-the-word",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["franchise/flower-shop-mystery"],
  position: 1,
  publishedAt: "2016-01-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "374739",
      externalLink: "https://www.themoviedb.org/movie/374739",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Flower Shop Mystery: Mum's the Word",
  genres: ["Mystery", "TV Movie", "Crime", "Romance"],
  imdbId: "tt5211694",
  posterPath: "/yybzcfZJkgGWEnuuZTcBNKh2gXU.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T20:45:04.980Z",
} as const satisfies Movie
