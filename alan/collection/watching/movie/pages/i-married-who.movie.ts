import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iMarriedWho = {
  id: "01a17499-669f-77b4-a128-dd1f06d40bd2",
  type: "page-type/movie",
  slug: "i-married-who",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "139251",
      externalLink: "https://www.themoviedb.org/movie/139251",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "I Married Who?",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt2107651",
  posterPath: "/lLqUdTxPCxSPANKeNHl5wusH7Ze.jpg",
  voteAverage: 6,
  streamingOn: ["PixL Amazon Channel", "UP Faith & Family Amazon Channel ", "Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
