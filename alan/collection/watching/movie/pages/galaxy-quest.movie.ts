import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const galaxyQuest = {
  id: "01a06802-6d99-7010-b9dc-96d3aaedc854",
  type: "page-type/movie",
  slug: "galaxy-quest",
  title: "Galaxy Quest",
  partOfCollections: ["show-collection/science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1999-12-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/galaxy-quest-1999",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
