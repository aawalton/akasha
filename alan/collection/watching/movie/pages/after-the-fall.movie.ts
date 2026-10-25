import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const afterTheFall = {
  id: "01a17499-470b-7dd8-bd14-f58b5cf06c34",
  type: "page-type/movie",
  slug: "after-the-fall",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2010-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "89269",
      externalLink: "https://www.themoviedb.org/movie/89269",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "After the Fall",
  genres: ["Drama", "TV Movie"],
  imdbId: "tt1737583",
  posterPath: "/1eaH8BI6zGvWgKt6svtb6bt2DD8.jpg",
  voteAverage: 5.2,
  streamingOn: ["PixL Amazon Channel", "Xumo Play"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
