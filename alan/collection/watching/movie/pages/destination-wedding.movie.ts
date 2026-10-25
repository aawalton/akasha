import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const destinationWedding = {
  id: "01a17499-a7d4-77d7-a300-e7836b05f028",
  type: "page-type/movie",
  slug: "destination-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2017-06-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "459828",
      externalLink: "https://www.themoviedb.org/movie/459828",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Destination Wedding",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt6970518",
  posterPath: "/wnvFZnzFNuoCldIdM7nENTqMThP.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
  ],
  createdAt: "2026-10-25T19:46:29.458Z",
  updatedAt: "2026-10-25T19:46:29.458Z",
} as const satisfies Movie
