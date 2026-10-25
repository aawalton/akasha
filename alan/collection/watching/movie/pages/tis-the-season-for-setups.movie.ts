import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const tisTheSeasonForSetups = {
  id: "01a1749a-c86c-7164-82ca-d8d282accb85",
  type: "page-type/movie",
  slug: "tis-the-season-for-setups",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-10-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1772765",
      externalLink: "https://www.themoviedb.org/movie/1772765",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "’Tis the Season for Setups",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt40644230",
  posterPath: "/gf3lx7vxAoSONF2TYerFwLDeHzV.jpg",
  voteAverage: 2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
