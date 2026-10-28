import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBoyfriendForChristmas = {
  id: "01a17497-3824-7007-8646-7d523bbf1f79",
  type: "page-type/movie",
  slug: "a-boyfriend-for-christmas",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2004-11-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "26463",
      externalLink: "https://www.themoviedb.org/movie/26463",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/A_Boyfriend_for_Christmas",
    },
  ],
  title: "A Boyfriend for Christmas",
  genres: ["TV Movie", "Romance", "Comedy", "Drama", "Family"],
  imdbId: "tt0385567",
  posterPath: "/nj4Dg2xsHzTpSvgwxRrs6uyHHjh.jpg",
  voteAverage: 5.516,
  streamingOn: ["streaming-service/up-faith-and-family", "streaming-service/xumo-play"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
