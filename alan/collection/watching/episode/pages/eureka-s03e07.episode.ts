import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e07 = {
  id: "01a18848-3732-7a79-bb4d-b778bb1000ce",
  type: "page-type/episode",
  slug: "eureka-s03e07",
  description:
    "The Eureka mayoral race is overshadowed by the sudden arrival of a second sun, forcing Carter, Allison and Zane to investigate it more closely.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 7,
  publishedAt: "2008-09-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335259",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/7",
    },
  ],
  title: "Here Come the Suns",
  episodeType: "standard",
  stillPath: "/cqLUTPjR48d6xVuNkWnGjEUBhHr.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
