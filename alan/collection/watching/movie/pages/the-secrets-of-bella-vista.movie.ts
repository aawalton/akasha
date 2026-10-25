import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theSecretsOfBellaVista = {
  id: "01a1749a-66c1-748e-9a7c-df18b7005b11",
  type: "page-type/movie",
  slug: "the-secrets-of-bella-vista",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1006314",
      externalLink: "https://www.themoviedb.org/movie/1006314",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Secrets of Bella Vista",
  genres: ["TV Movie", "Drama", "Romance"],
  imdbId: "tt21617068",
  posterPath: "/7ijWWFzjfqaAFkddcs46wlGROVH.jpg",
  voteAverage: 6.7,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Plex",
    "Plex Channel",
    "The Roku Channel",
    "Tubi TV",
    "YouTube Free",
    "YouTube TV",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
