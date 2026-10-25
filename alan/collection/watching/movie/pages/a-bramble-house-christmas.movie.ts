import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aBrambleHouseChristmas = {
  id: "01a17499-c959-7ea9-a3ba-6c01c9cfb830",
  type: "page-type/movie",
  slug: "a-bramble-house-christmas",
  ownLength: 85,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-11-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "479606",
      externalLink: "https://www.themoviedb.org/movie/479606",
      lastSyncedAt: "2026-10-25",
    },
    {
      source: "wikipedia",
      externalLink: "https://en.wikipedia.org/wiki/A_Bramble_House_Christmas",
    },
  ],
  title: "A Bramble House Christmas",
  genres: ["TV Movie", "Drama"],
  imdbId: "tt7657462",
  posterPath: "/dosP338nILsuFDfJuKjNMvaDcbO.jpg",
  voteAverage: 6.379,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
