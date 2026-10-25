import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasMelody = {
  id: "01a17499-8943-7515-9e0c-ea48075993fb",
  type: "page-type/movie",
  slug: "a-christmas-melody",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-12-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "366018",
      externalLink: "https://www.themoviedb.org/movie/366018",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/A_Christmas_Melody" },
  ],
  title: "A Christmas Melody",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt4587740",
  posterPath: "/uetNOoUIwmeavHYnimc8B9tnDOq.jpg",
  voteAverage: 6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
