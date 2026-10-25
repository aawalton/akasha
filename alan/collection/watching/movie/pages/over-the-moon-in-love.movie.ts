import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const overTheMoonInLove = {
  id: "01a17499-e805-70f5-950e-6fe497bab7c8",
  type: "page-type/movie",
  slug: "over-the-moon-in-love",
  ownLength: 90,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2019-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "626267",
      externalLink: "https://www.themoviedb.org/movie/626267",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Over the Moon in Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt10298896",
  posterPath: "/2JVwrut5sFraOrzHYVOzPblR13d.jpg",
  voteAverage: 6.4,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "YouTube TV",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:46:45.888Z",
  updatedAt: "2026-10-25T19:46:45.888Z",
} as const satisfies Movie
