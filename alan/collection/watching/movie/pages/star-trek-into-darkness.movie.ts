import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekIntoDarkness = {
  id: "01a06802-6d99-7040-a682-4e1eb61da267",
  type: "page-type/movie",
  slug: "star-trek-into-darkness",
  title: "Star Trek Into Darkness",
  partOfCollections: ["fandom/star-trek-3"],
  position: 18,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2013-05-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-into-darkness-2013",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
