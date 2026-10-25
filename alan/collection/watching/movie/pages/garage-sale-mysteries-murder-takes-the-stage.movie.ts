import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const garageSaleMysteriesMurderTakesTheStage = {
  id: "01a1749a-c869-73ea-9779-70cb4d7bcf99",
  type: "page-type/movie",
  slug: "garage-sale-mysteries-murder-takes-the-stage",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/garage-sale-mysteries"],
  position: 16,
  publishedAt: "2026-09-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1743700",
      externalLink: "https://www.themoviedb.org/movie/1743700",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Garage Sale Mysteries: Murder Takes the Stage",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt43746311",
  posterPath: "/qUKlHkyHXs3RCBPW3Kto9q722t8.jpg",
  voteAverage: 4.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T20:45:31.132Z",
} as const satisfies Movie
