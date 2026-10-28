import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hetaliaSeason1 = {
  id: "01a183d7-7ce7-7992-b8ab-bcc334c9b062",
  type: "page-type/season",
  slug: "hetalia-season-1",
  description:
    "Forget what you learned in history class, and imagine all the nations of the world as guys on an inappropriate reality show. Pledge allegiance to your favorite superpower in Hetalia Axis Powers!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hetalia"],
  position: 1,
  publishedAt: "2009-01-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "45898",
      externalLink: "https://www.themoviedb.org/tv/35138/season/1",
    },
  ],
  title: "Axis Powers",
  posterPath: "/j2WE0BSRfJUXdM8tzN3EPhEyR5x.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Season
