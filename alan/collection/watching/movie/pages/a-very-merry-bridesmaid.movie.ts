import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const aVeryMerryBridesmaid = {
  id: "01a1749a-2598-74f0-bccb-398b1e33432d",
  type: "page-type/movie",
  slug: "a-very-merry-bridesmaid",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2021-12-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "876104",
      externalLink: "https://www.themoviedb.org/movie/876104",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "A Very Merry Bridesmaid",
  genres: ["TV Movie", "Comedy", "Romance"],
  imdbId: "tt15403980",
  posterPath: "/yGQIre0Q9TVf9sjMNUZ1FNzfkNI.jpg",
  voteAverage: 6.25,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
