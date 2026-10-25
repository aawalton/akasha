import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theWatsonsGoToBirmingham = {
  id: "01a17499-66a3-793f-bac6-4831dbf57572",
  type: "page-type/movie",
  slug: "the-watsons-go-to-birmingham",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-09-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "225935",
      externalLink: "https://www.themoviedb.org/movie/225935",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Watsons Go to Birmingham",
  genres: ["Family", "TV Movie"],
  imdbId: "tt2866296",
  posterPath: "/xcrOuw08rrC5WkLoXiU87AeZ577.jpg",
  voteAverage: 6.8,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
