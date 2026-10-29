import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e05 = {
  id: "01a18848-3730-757d-bd31-3f1b4c6fb561",
  type: "page-type/episode",
  slug: "eureka-s01e05",
  description:
    "An unpredictable researcher accidentally unleashes a dangerous artifact which was previously hidden by Nathan Stark.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 5,
  publishedAt: "2006-08-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335232",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/5",
    },
  ],
  title: "Invincible",
  episodeType: "standard",
  stillPath: "/b2MJCcMTZgZZTfrqjHu83jbLFrn.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
