import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const janeDoeTheHarderTheyFall = {
  id: "01a17497-3826-7f84-acc7-82d1d37795f8",
  type: "page-type/movie",
  slug: "jane-doe-the-harder-they-fall",
  ownLength: 81,
  ownProgress: 0,
  partOfCollections: ["franchise/jane-doe"],
  position: 5,
  publishedAt: "2006-03-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "111178",
      externalLink: "https://www.themoviedb.org/movie/111178",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Jane Doe: The Harder They Fall",
  genres: ["Crime", "Mystery", "TV Movie"],
  imdbId: "tt0455134",
  posterPath: "/FDlLS4EwVcaq4dIsGqieRTwHpv.jpg",
  voteAverage: 6.4,
  streamingOn: ["UP Faith & Family Amazon Channel ", "UP Faith & Family Apple TV channel"],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
