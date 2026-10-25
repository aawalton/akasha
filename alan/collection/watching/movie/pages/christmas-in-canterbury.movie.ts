import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const christmasInCanterbury = {
  id: "01a1749a-c868-71df-a27f-6264dbc103cb",
  type: "page-type/movie",
  slug: "christmas-in-canterbury",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show-collection/hallmark-christmas"],
  publishedAt: "2026-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1733866",
      externalLink: "https://www.themoviedb.org/movie/1733866",
      lastSyncedAt: "2026-10-25",
    },
  ],
  title: "Christmas in Canterbury",
  genres: ["Romance"],
  imdbId: "tt43750204",
  voteAverage: 0,
  createdAt: "2026-10-25T19:47:43.335Z",
  updatedAt: "2026-10-25T19:47:43.335Z",
} as const satisfies Movie
