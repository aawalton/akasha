import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const beverlyHillsWedding = {
  id: "01a1749a-2599-7efa-bf5e-a91943f500d3",
  type: "page-type/movie",
  slug: "beverly-hills-wedding",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2021-02-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "784378",
      externalLink: "https://www.themoviedb.org/movie/784378",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Beverly Hills Wedding",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt13827742",
  posterPath: "/bghXohmeni6EDZQdZSQkvJG1hjE.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
