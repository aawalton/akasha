import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iceDreams = {
  id: "01a17499-470d-72ed-a4f9-fb4c1d05ad75",
  type: "page-type/movie",
  slug: "ice-dreams",
  ownLength: 120,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2010-01-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "123883",
      externalLink: "https://www.themoviedb.org/movie/123883",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ice Dreams",
  genres: ["Romance", "TV Movie", "Drama", "Family"],
  imdbId: "tt1299366",
  posterPath: "/8ODLVTvXLjnkrW5rr2ybcHCBW1h.jpg",
  voteAverage: 6.4,
  streamingOn: ["PixL Amazon Channel"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
