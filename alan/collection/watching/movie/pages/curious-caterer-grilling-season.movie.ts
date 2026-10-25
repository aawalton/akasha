import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const curiousCatererGrillingSeason = {
  id: "01a1749a-89a8-791f-b7d7-b2bc7a004ee0",
  type: "page-type/movie",
  slug: "curious-caterer-grilling-season",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/the-curious-caterer"],
  position: 1,
  publishedAt: "2023-02-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1068830",
      externalLink: "https://www.themoviedb.org/movie/1068830",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Curious Caterer: Grilling Season",
  genres: ["TV Movie", "Mystery"],
  imdbId: "tt23057702",
  posterPath: "/4uuk28oJVIqK8AyUpoxfHIndG9Z.jpg",
  voteAverage: 7.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
