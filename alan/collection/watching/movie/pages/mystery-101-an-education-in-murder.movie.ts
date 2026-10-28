import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const mystery101AnEducationInMurder = {
  id: "01a1749a-259b-7fb8-b19c-d6bce7b5f9d7",
  type: "page-type/movie",
  slug: "mystery-101-an-education-in-murder",
  ownLength: 83,
  ownProgress: 0,
  partOfCollections: ["franchise/mystery-101"],
  position: 5,
  publishedAt: "2020-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "676621",
      externalLink: "https://www.themoviedb.org/movie/676621",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Mystery 101: An Education in Murder",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt11686346",
  posterPath: "/xy3GWpfmiHjKR5DS49HT4G7GEC9.jpg",
  voteAverage: 6.914,
  streamingOn: [
    "streaming-service/fubotv",
    "streaming-service/hallmark-plus",
    "streaming-service/hallmark-tv",
    "streaming-service/philo",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-28T20:38:30.445Z",
} as const satisfies Movie
