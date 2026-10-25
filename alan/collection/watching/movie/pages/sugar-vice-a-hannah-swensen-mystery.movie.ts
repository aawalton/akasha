import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const sugarViceAHannahSwensenMystery = {
  id: "01a1749a-c86b-702b-ba1c-90d87042f195",
  type: "page-type/movie",
  slug: "sugar-vice-a-hannah-swensen-mystery",
  ownLength: 84,
  ownProgress: 0,
  partOfCollections: ["franchise/hannah-swensen-mysteries"],
  position: 12,
  publishedAt: "2026-03-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1627985",
      externalLink: "https://www.themoviedb.org/movie/1627985",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Sugar & Vice: A Hannah Swensen Mystery",
  genres: ["Mystery", "TV Movie"],
  imdbId: "tt39568479",
  posterPath: "/gN2AASKIg3vIWeMsNwhHpeD0TDX.jpg",
  voteAverage: 6.5,
  streamingOn: [
    "Hallmark TV Amazon Channel",
    "Hallmark+ Amazon Channel",
    "Hallmark+ Apple TV channel",
  ],
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
