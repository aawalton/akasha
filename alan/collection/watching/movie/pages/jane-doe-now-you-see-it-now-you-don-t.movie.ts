import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeNowYouSeeItNowYouDonT = {
  id: "01a17497-3826-7dde-ac35-0a5e74510ee8",
  type: "page-type/movie",
  slug: "jane-doe-now-you-see-it-now-you-don-t",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 2,
  publishedAt: "2005-02-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "68676",
      externalLink: "https://www.themoviedb.org/movie/68676",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: Now You See It, Now You Don't",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt0435708",
  posterPath: "/bjIfrjSkLebR92pVvYQ6oQN9BRt.jpg",
  voteAverage: 6,
  streamingOn: ["streaming-service/up-faith-and-family"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
