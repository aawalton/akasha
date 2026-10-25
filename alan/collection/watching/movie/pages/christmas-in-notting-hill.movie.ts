import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInNottingHill = {
  id: "01a1749a-66bc-71d4-86d2-5606d6bdd8f2",
  type: "page-type/movie",
  slug: "christmas-in-notting-hill",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2023-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1142710",
      externalLink: "https://www.themoviedb.org/movie/1142710",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Notting Hill",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt29233347",
  posterPath: "/qZ4DpLKt1uVpjwbApyuJIkD1OaZ.jpg",
  voteAverage: 6.022,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
