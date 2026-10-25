import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aKissAtMidnight = {
  id: "01a17499-470a-7b3d-95fa-f4eab16b89fe",
  type: "page-type/movie",
  slug: "a-kiss-at-midnight",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2008-12-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "251630",
      externalLink: "https://www.themoviedb.org/movie/251630",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Kiss at Midnight",
  genres: ["Romance", "Family", "TV Movie"],
  imdbId: "tt1272019",
  posterPath: "/pt9yBVuzsn9H1VLIfW9cxbWVd8P.jpg",
  voteAverage: 6.6,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
