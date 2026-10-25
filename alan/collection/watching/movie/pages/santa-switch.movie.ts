import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const santaSwitch = {
  id: "01a17499-66a1-70e7-a1ea-fbdae87c158c",
  type: "page-type/movie",
  slug: "santa-switch",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2013-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "249059",
      externalLink: "https://www.themoviedb.org/movie/249059",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Santa Switch",
  genres: ["Comedy", "Family", "TV Movie"],
  imdbId: "tt2639488",
  posterPath: "/qdofjYeV4YPB4zaJem1mKZCgxU1.jpg",
  voteAverage: 5.2,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
