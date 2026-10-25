import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aMachuPicchuProposal = {
  id: "01a1749a-a948-7c8e-80c3-c6f1fcf2cb3e",
  type: "page-type/movie",
  slug: "a-machu-picchu-proposal",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2025-06-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1468471",
      externalLink: "https://www.themoviedb.org/movie/1468471",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Machu Picchu Proposal",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt36615154",
  posterPath: "/ySrjf2ExY0qlKfl3HjmsOgMSTFN.jpg",
  voteAverage: 7.3,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:35.367Z",
  updatedAt: "2026-10-25T19:47:35.367Z",
} as const satisfies Movie
