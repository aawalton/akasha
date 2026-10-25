import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const chanceAtRomance = {
  id: "01a17499-8944-70d6-89c7-a482e2f3c378",
  type: "page-type/movie",
  slug: "chance-at-romance",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "256277",
      externalLink: "https://www.themoviedb.org/movie/256277",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Chance at Romance",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt3338436",
  posterPath: "/stXiBneBvS5mLoALZHJO1X1Vi3C.jpg",
  voteAverage: 6.2,
  streamingOn: ["PixL Amazon Channel"],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
