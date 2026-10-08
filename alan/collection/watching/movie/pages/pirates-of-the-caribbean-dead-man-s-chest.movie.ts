import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const piratesOfTheCaribbeanDeadManSChest = {
  id: "01a06802-6d99-7027-b732-0802d0bcec08",
  type: "page-type/movie",
  slug: "pirates-of-the-caribbean-dead-man-s-chest",
  title: "Pirates of the Caribbean: Dead Man's Chest",
  partOfCollections: ["fandom/pirates-of-the-caribbean-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-07-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/pirates-of-the-caribbean-dead-man-s-chest-2006",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
