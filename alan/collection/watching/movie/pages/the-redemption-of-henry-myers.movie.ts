import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theRedemptionOfHenryMyers = {
  id: "01a17499-8949-7515-be23-27dde68bb3c4",
  type: "page-type/movie",
  slug: "the-redemption-of-henry-myers",
  ownLength: 101,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2014-03-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "267288",
      externalLink: "https://www.themoviedb.org/movie/267288",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Redemption of Henry Myers",
  genres: ["TV Movie", "Western"],
  imdbId: "tt2175016",
  posterPath: "/mBpo9Fe6WmtBNHjbm1S75D3okzz.jpg",
  voteAverage: 5.1,
  streamingOn: [
    "Angel Studios",
    "Great American Pure Flix Amazon Channel",
    "Peacock Premium",
    "Peacock Premium Plus",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
