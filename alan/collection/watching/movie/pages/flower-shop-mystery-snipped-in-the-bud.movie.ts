import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const flowerShopMysterySnippedInTheBud = {
  id: "01a17499-a7d4-7cdc-ac34-006ae36d0332",
  type: "page-type/movie",
  slug: "flower-shop-mystery-snipped-in-the-bud",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/flower-shop-mystery"],
  position: 2,
  publishedAt: "2016-04-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "392625",
      externalLink: "https://www.themoviedb.org/movie/392625",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Flower Shop Mystery: Snipped in the Bud",
  genres: ["TV Movie", "Mystery", "Crime", "Drama"],
  imdbId: "tt5459456",
  posterPath: "/5cKtGbgxh47bROQx7raEGG8ZwfD.jpg",
  voteAverage: 6.4,
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
