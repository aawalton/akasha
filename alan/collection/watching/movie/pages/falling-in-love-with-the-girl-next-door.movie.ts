import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const fallingInLoveWithTheGirlNextDoor = {
  id: "01a17497-3825-77c1-b7ba-23d91f2506dc",
  type: "page-type/movie",
  slug: "falling-in-love-with-the-girl-next-door",
  ownLength: 92,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2006-02-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "124176",
      externalLink: "https://www.themoviedb.org/movie/124176",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Falling in Love with the Girl Next Door",
  genres: ["Comedy", "TV Movie"],
  imdbId: "tt0453486",
  posterPath: "/yj8dj3AUyR1WVuaUXc6DQckj5wH.jpg",
  voteAverage: 5.9,
  streamingOn: [
    "PixL Amazon Channel",
    "UP Faith & Family Amazon Channel ",
    "UP Faith & Family Apple TV channel",
    "Xumo Play",
  ],
  createdAt: "2026-10-25T19:43:49.795Z",
  updatedAt: "2026-10-25T19:43:49.795Z",
} as const satisfies Movie
