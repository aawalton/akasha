import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dearDumbDiary = {
  id: "01a17499-669e-7629-8d49-9188df92347a",
  type: "page-type/movie",
  slug: "dear-dumb-diary",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-09-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "221510",
      externalLink: "https://www.themoviedb.org/movie/221510",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Dear Dumb Diary",
  genres: ["Family", "TV Movie", "Music"],
  imdbId: "tt3102360",
  posterPath: "/pLupaemAAUdadkVRPXdVPkkymVC.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
