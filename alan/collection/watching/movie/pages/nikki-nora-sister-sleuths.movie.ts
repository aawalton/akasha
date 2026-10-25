import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const nikkiNoraSisterSleuths = {
  id: "01a1749a-66c0-751c-9765-b761bf5450da",
  type: "page-type/movie",
  slug: "nikki-nora-sister-sleuths",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2022-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1020532",
      externalLink: "https://www.themoviedb.org/movie/1020532",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Nikki & Nora: Sister Sleuths",
  genres: ["TV Movie", "Mystery", "Drama"],
  imdbId: "tt21969174",
  posterPath: "/mE6ZKmeTasfuqa0uSLvHKegdwWl.jpg",
  voteAverage: 6.2,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:18.330Z",
  updatedAt: "2026-10-25T19:47:18.330Z",
} as const satisfies Movie
