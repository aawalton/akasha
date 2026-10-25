import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fromFriendToFiance = {
  id: "01a17499-e803-71d9-bddc-b1ec7cecc105",
  type: "page-type/movie",
  slug: "from-friend-to-fiance",
  ownLength: 77,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-05-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "601609",
      externalLink: "https://www.themoviedb.org/movie/601609",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "From Friend to Fiancé",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8746226",
  posterPath: "/wj3qzKX4FUkzOEEnT8zH45JhcHB.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
