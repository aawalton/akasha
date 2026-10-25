import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const kentuckyRoses = {
  id: "01a1749a-c869-73c1-8123-93d2db09423e",
  type: "page-type/movie",
  slug: "kentucky-roses",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-romance"],
  publishedAt: "2026-05-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1575806",
      externalLink: "https://www.themoviedb.org/movie/1575806",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Kentucky Roses",
  genres: ["Romance", "TV Movie", "Drama"],
  imdbId: "tt39276947",
  posterPath: "/2Et03jKQ7fhQvQhA2Znkk1kVctY.jpg",
  voteAverage: 7.2,
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
