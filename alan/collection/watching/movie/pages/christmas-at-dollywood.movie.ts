import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtDollywood = {
  id: "01a1749a-06ba-70eb-af6d-d9e5ddd674ee",
  type: "page-type/movie",
  slug: "christmas-at-dollywood",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626309",
      externalLink: "https://www.themoviedb.org/movie/626309",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Dollywood",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt10627564",
  posterPath: "/wJS8MfxkzdjjfCweZUKdlXKZamr.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
