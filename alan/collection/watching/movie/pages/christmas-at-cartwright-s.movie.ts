import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasAtCartwrightS = {
  id: "01a17499-8944-7afd-b25d-9ef6d4db2b37",
  type: "page-type/movie",
  slug: "christmas-at-cartwright-s",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2014-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "299588",
      externalLink: "https://www.themoviedb.org/movie/299588",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas at Cartwright's",
  genres: ["Romance", "Family", "Drama", "TV Movie"],
  imdbId: "tt4177742",
  posterPath: "/A2cB6LmmzSZrJOSk50mDWPKswRK.jpg",
  voteAverage: 5.6,
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
