import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const puppyLove = {
  id: "01a17499-66a1-74b8-8a67-d4f198152284",
  type: "page-type/movie",
  slug: "puppy-love",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2012-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "153098",
      externalLink: "https://www.themoviedb.org/movie/153098",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Puppy Love",
  genres: ["TV Movie", "Comedy", "Drama", "Family"],
  imdbId: "tt2214864",
  posterPath: "/gOceeXislvDzweFEQx1REq4970Z.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
