import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasNextDoor = {
  id: "01a17499-c95b-72f6-9a1a-509c3fc2c0a2",
  type: "page-type/movie",
  slug: "christmas-next-door",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2017-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "490146",
      externalLink: "https://www.themoviedb.org/movie/490146",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas Next Door",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt7616668",
  posterPath: "/vY8GqUw4qXds2HblGYhRu1XcAu1.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:38.041Z",
  updatedAt: "2026-10-25T19:46:38.041Z",
} as const satisfies Movie
