import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e03 = {
  id: "01a18848-3730-72b3-8c79-6003abc5d26b",
  type: "page-type/episode",
  slug: "eureka-s01e03",
  description: "Something starts to steal the townspeople's memory...",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 3,
  publishedAt: "2006-08-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335230",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/3",
    },
  ],
  title: "Before I Forget",
  episodeType: "standard",
  stillPath: "/6VcaOEq1hQHD1Mo6Fo6XeG4mMxB.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
