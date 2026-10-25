import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const citizenJane = {
  id: "01a17499-470b-7836-8cb6-4e2e59300b35",
  type: "page-type/movie",
  slug: "citizen-jane",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2009-09-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "69371",
      externalLink: "https://www.themoviedb.org/movie/69371",
      lastSyncedAt: "2026-10-25",
    },
    { source: "wikipedia", externalLink: "https://en.wikipedia.org/wiki/Citizen_Jane_(film)" },
  ],
  title: "Citizen Jane",
  genres: ["Crime", "Mystery", "TV Movie"],
  imdbId: "tt1415256",
  posterPath: "/4Ah3UpfcEJMQvNcOslocgoISdk5.jpg",
  voteAverage: 5.1,
  streamingOn: ["Pluto TV"],
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
