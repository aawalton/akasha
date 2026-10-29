import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e03 = {
  id: "01a18848-3732-7b67-8e59-59c3eb029cdc",
  type: "page-type/episode",
  slug: "eureka-s03e03",
  description:
    "Eureka's annual dog show is underway and is like none other. Meanwhile, Sheriff Carter experiences an earthquake; Zoe debates quitting the accelerated physics program; and Allison starts the process of fitting her wedding dress.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 3,
  publishedAt: "2008-08-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335255",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/3",
    },
  ],
  title: "Best in Faux",
  episodeType: "standard",
  stillPath: "/nEE4B5bupJpM8rjwbTDZLkkq6IJ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
