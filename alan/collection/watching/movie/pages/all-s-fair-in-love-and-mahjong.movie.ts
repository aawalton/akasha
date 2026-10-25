import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const allSFairInLoveAndMahjong = {
  id: "01a1749a-c868-7414-a229-337196b2ad2a",
  type: "page-type/movie",
  slug: "all-s-fair-in-love-and-mahjong",
  ownLength: 86,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-05-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1662270",
      externalLink: "https://www.themoviedb.org/movie/1662270",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "All's Fair in Love and Mahjong",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt41309166",
  posterPath: "/eihoAaoGhcT3buJf8rdl3C0G0F8.jpg",
  voteAverage: 5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
