import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e02 = {
  id: "01a18848-3732-7040-9468-f14b87edd656",
  type: "page-type/episode",
  slug: "eureka-s03e02",
  description:
    'Carter and Allison investigate when a scientist mysteriously disappears from a sealed biosphere. Meanwhile, the "Fixer" tries to make Eureka\'s efforts more profitable.',
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 2,
  publishedAt: "2008-08-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335254",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/2",
    },
  ],
  title: "What About Bob?",
  episodeType: "standard",
  stillPath: "/zae0tYo24WoIWDNPB0GG4vKEPPa.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
