import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mrsWashingtonGoesToSmith = {
  id: "01a17499-470d-7119-a9c5-18b7ddec3901",
  type: "page-type/movie",
  slug: "mrs-washington-goes-to-smith",
  ownLength: 89,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2009-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "47769",
      externalLink: "https://www.themoviedb.org/movie/47769",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mrs. Washington Goes to Smith",
  genres: ["Comedy", "Drama", "Romance", "TV Movie"],
  imdbId: "tt1367239",
  posterPath: "/ApilPRnRLTCTq6okx6TSoZXQreb.jpg",
  voteAverage: 3.8,
  createdAt: "2026-10-25T19:46:04.682Z",
  updatedAt: "2026-10-25T19:46:04.682Z",
} as const satisfies Movie
