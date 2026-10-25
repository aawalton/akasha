import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const loveStrikesTwice = {
  id: "01a1749a-259b-703a-b824-2d06b593a1f8",
  type: "page-type/movie",
  slug: "love-strikes-twice",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2021-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "860262",
      externalLink: "https://www.themoviedb.org/movie/860262",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Love Strikes Twice",
  genres: ["TV Movie", "Comedy", "Romance", "Mystery", "Drama"],
  imdbId: "tt15209000",
  posterPath: "/hSyJ9LgyRbinRP5NazWUcjBmCh5.jpg",
  voteAverage: 6.6,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
