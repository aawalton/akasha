import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const romanceToTheRescue = {
  id: "01a1749a-464d-7b9c-b2f5-6ecffea9bbd7",
  type: "page-type/movie",
  slug: "romance-to-the-rescue",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2022-05-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919961",
      externalLink: "https://www.themoviedb.org/movie/919961",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Romance to the Rescue",
  genres: ["TV Movie", "Comedy", "Romance", "Drama"],
  imdbId: "tt19316140",
  posterPath: "/tOfJmeOFI6uMkhVbUYniCvb9tfP.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:10.024Z",
  updatedAt: "2026-10-25T19:47:10.024Z",
} as const satisfies Movie
