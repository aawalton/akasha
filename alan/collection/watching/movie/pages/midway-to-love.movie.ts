import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const midwayToLove = {
  id: "01a1749a-259b-759c-baea-317cd479ca7f",
  type: "page-type/movie",
  slug: "midway-to-love",
  ownLength: 87,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-mystery"],
  publishedAt: "2020-06-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "609434",
      externalLink: "https://www.themoviedb.org/movie/609434",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Midway to Love",
  genres: ["Romance", "TV Movie"],
  imdbId: "tt8954890",
  posterPath: "/tvLI9q2TJfa6GZT8RiCcQ0b7ryl.jpg",
  voteAverage: 6.1,
  streamingOn: [
    "Amazon MX Player",
    "Amazon Prime Video",
    "Amazon Prime Video Free with Ads",
    "Amazon Prime Video with Ads",
    "Plex",
    "Plex Channel",
    "Runtime",
    "The Roku Channel",
  ],
  createdAt: "2026-10-25T19:47:01.655Z",
  updatedAt: "2026-10-25T19:47:01.655Z",
} as const satisfies Movie
