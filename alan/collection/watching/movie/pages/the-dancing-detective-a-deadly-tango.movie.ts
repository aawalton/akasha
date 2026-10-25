import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const theDancingDetectiveADeadlyTango = {
  id: "01a1749a-89ab-7e81-af87-820e2b01a94d",
  type: "page-type/movie",
  slug: "the-dancing-detective-a-deadly-tango",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2023-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1093760",
      externalLink: "https://www.themoviedb.org/movie/1093760",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "The Dancing Detective: A Deadly Tango",
  genres: ["TV Movie", "Mystery", "Drama", "Crime"],
  imdbId: "tt27337668",
  posterPath: "/cYm3UlMTQHDFC5LXekGFbBbYALV.jpg",
  voteAverage: 6.8,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
    "Philo",
    "fuboTV",
  ],
  createdAt: "2026-10-25T19:47:27.269Z",
  updatedAt: "2026-10-25T19:47:27.269Z",
} as const satisfies Movie
