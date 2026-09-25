import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const dungeonsAndDragonsHonorAmongThieves = {
  id: "01a06802-6d99-7009-8389-daa3f275e31c",
  type: "page-type/movie",
  slug: "dungeons-and-dragons-honor-among-thieves",
  title: "Dungeons & Dragons: Honor Among Thieves",
  partOfCollections: ["show-collection/dungeons-and-dragons-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2023-03-31",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/dungeons-dragons-honor-among-thieves-2023",
      lastSyncedAt: "2025-09-30",
    },
  ],
} as const satisfies Movie
