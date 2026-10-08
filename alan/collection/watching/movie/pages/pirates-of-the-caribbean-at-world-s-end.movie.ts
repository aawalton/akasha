import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const piratesOfTheCaribbeanAtWorldSEnd = {
  id: "01a06802-6d99-7026-8e8d-f6b083ff105e",
  type: "page-type/movie",
  slug: "pirates-of-the-caribbean-at-world-s-end",
  title: "Pirates of the Caribbean: At World's End",
  partOfCollections: ["fandom/pirates-of-the-caribbean-2"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2007-05-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/pirates-of-the-caribbean-at-world-s-end-2007",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
