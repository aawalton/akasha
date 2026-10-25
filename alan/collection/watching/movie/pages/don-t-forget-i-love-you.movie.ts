import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const donTForgetILoveYou = {
  id: "01a1749a-464a-764a-bd82-ceff345ce9fe",
  type: "page-type/movie",
  slug: "don-t-forget-i-love-you",
  ownLength: 127,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-01-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "936379",
      externalLink: "https://www.themoviedb.org/movie/936379",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Don't Forget I Love You",
  genres: ["Romance", "Comedy"],
  imdbId: "tt17023920",
  posterPath: "/aXcApeQNUMy6H6QDIn5R20Vp05T.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
