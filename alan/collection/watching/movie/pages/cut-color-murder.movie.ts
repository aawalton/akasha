import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const cutColorMurder = {
  id: "01a1749a-66bd-78bc-b55f-7f543644cf18",
  type: "page-type/movie",
  slug: "cut-color-murder",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "910773",
      externalLink: "https://www.themoviedb.org/movie/910773",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Cut, Color, Murder",
  genres: ["TV Movie", "Mystery", "Crime"],
  imdbId: "tt16750392",
  posterPath: "/c9PL2RIpitSRtxG8Evp8gpiH4iz.jpg",
  voteAverage: 6.167,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
