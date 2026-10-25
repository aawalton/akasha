import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasOnHoneysuckleLane = {
  id: "01a17499-e802-7de5-a9ba-c7881fb02b0f",
  type: "page-type/movie",
  slug: "christmas-on-honeysuckle-lane",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2018-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "553798",
      externalLink: "https://www.themoviedb.org/movie/553798",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/Christmas_on_Honeysuckle_Lane",
    },
  ],
  title: "Christmas on Honeysuckle Lane",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt9083646",
  posterPath: "/yEEXq5VYP0gvaCYRiyag4BvZcTx.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
