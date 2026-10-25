import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const thisMagicMoment = {
  id: "01a17499-66a3-7bc3-8ce4-b4848d180956",
  type: "page-type/movie",
  slug: "this-magic-moment",
  ownLength: 75,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2013-08-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "217128",
      externalLink: "https://www.themoviedb.org/movie/217128",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "This Magic Moment",
  genres: ["Comedy"],
  imdbId: "tt2462824",
  posterPath: "/qw22zURfBFX5JLhwNytPggFo0Ya.jpg",
  voteAverage: 5.5,
  streamingOn: ["Xumo Play"],
  createdAt: "2026-10-25T19:46:12.764Z",
  updatedAt: "2026-10-25T19:46:12.764Z",
} as const satisfies Movie
