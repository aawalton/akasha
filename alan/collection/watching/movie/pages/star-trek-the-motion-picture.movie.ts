import type { Movie } from "akasha/alan/collection/watching/movie/movie.page-type.types.ts"

export const starTrekTheMotionPicture = {
  id: "01a06802-6d99-7044-8561-4ee453e5da9d",
  type: "page-type/movie",
  slug: "star-trek-the-motion-picture",
  title: "Star Trek: The Motion Picture",
  partOfCollections: ["fandom/star-trek-3"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "1979-12-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/movies/star-trek-the-motion-picture-1979",
      lastSyncedAt: "2025-10-01",
    },
  ],
  createdAt: "2026-09-03T16:03:04.729Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Movie
