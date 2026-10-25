import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aChristmasLoveStory = {
  id: "01a1749a-06b9-7327-8984-76f11873b674",
  type: "page-type/movie",
  slug: "a-christmas-love-story",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2019-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626313",
      externalLink: "https://www.themoviedb.org/movie/626313",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Christmas Love Story",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt9747440",
  posterPath: "/uCkgza1eyHnK3TFzLwrvvVf8p22.jpg",
  voteAverage: 6.622,
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
