import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e17 = {
  id: "01a18848-3732-7062-b48d-b6d4bca4beaa",
  type: "page-type/episode",
  slug: "eureka-s03e17",
  description:
    "The first day on the job as temporary head of Global Dynamics proves daunting for Tess when a new Ice Age comes to Eureka; and a familiar face returns in the process.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 17,
  publishedAt: "2009-09-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335268",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/17",
    },
  ],
  title: "Have an Ice Day",
  episodeType: "standard",
  stillPath: "/lRWY7Go19rfK3vXiOZxZDgMwemb.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
