import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const myBestFriendSBouquet = {
  id: "01a1749a-06be-7966-b8bf-37619eaccd41",
  type: "page-type/movie",
  slug: "my-best-friend-s-bouquet",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2020-10-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "725853",
      externalLink: "https://www.themoviedb.org/movie/725853",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "My Best Friend's Bouquet",
  genres: ["TV Movie", "Romance"],
  imdbId: "tt12972410",
  posterPath: "/iXAfishnUmcoXk95DWsjKpdM2ca.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "Pluto TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:53.752Z",
  updatedAt: "2026-10-25T19:46:53.752Z",
} as const satisfies Movie
