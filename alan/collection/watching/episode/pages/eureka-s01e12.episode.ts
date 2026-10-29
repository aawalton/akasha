import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS01e12 = {
  id: "01a18848-3731-7b47-bca0-65786c388531",
  type: "page-type/episode",
  slug: "eureka-s01e12",
  description:
    "Ambition trumps common sense when Stark is given a chance to try out the Top-secret artifact. Once it's tested, Eureka warps into the future and ends up in 2010, where the town is different.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-1"],
  position: 12,
  publishedAt: "2006-10-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335239",
      externalLink: "https://www.themoviedb.org/tv/4620/season/1/episode/12",
    },
  ],
  title: "Once in a Lifetime",
  episodeType: "finale",
  stillPath: "/xv0bIXT4G56LPWWpK3Ua7x3h0hY.jpg",
  voteAverage: 8.7,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
