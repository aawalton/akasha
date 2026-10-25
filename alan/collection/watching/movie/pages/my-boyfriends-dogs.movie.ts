import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myBoyfriendsDogs = {
  id: "01a17499-8947-70cb-843e-5282b4786447",
  type: "page-type/movie",
  slug: "my-boyfriends-dogs",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2014-10-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "298317",
      externalLink: "https://www.themoviedb.org/movie/298317",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Boyfriends' Dogs",
  genres: ["Comedy", "Romance", "TV Movie"],
  imdbId: "tt3647110",
  posterPath: "/ffNqpSglkigE2eIVFGSXUYihFCN.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:21.634Z",
  updatedAt: "2026-10-25T19:46:21.634Z",
} as const satisfies Movie
