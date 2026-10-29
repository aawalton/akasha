import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e01 = {
  id: "01a18848-3734-7992-8f95-1efec734bede",
  type: "page-type/episode",
  slug: "eureka-s05e01",
  description:
    "The Astraeus crew returns to Eureka four years later and must adapt to a myriad of changes, including a more oppressive version of Deputy Andy.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 1,
  publishedAt: "2012-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335292",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/1",
    },
  ],
  title: "Lost",
  episodeType: "standard",
  stillPath: "/spHuNkXTopuVXGFnQB34k2oOCND.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
