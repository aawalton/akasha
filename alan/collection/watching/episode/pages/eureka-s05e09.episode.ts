import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e09 = {
  id: "01a18848-3734-7ac9-ad86-950d30bd4dc8",
  type: "page-type/episode",
  slug: "eureka-s05e09",
  description:
    "When Allison's genius older brother comes to meet her new husband, Carter feels the pressure of not being smart enough to measure up.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 9,
  publishedAt: "2012-06-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335298",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/9",
    },
  ],
  title: "Smarter Carter",
  episodeType: "standard",
  stillPath: "/mp0sYE2lLWU4oMae6g6tTPojW4r.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
