import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const iceSculptureChristmas = {
  id: "01a17499-8946-73b3-bb6d-550da3e3f4b2",
  type: "page-type/movie",
  slug: "ice-sculpture-christmas",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2015-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "360604",
      externalLink: "https://www.themoviedb.org/movie/360604",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Ice Sculpture Christmas",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt5031014",
  posterPath: "/tbLXuXt9ZBVGcrLE8AfLCzGfoHw.jpg",
  voteAverage: 6.1,
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
