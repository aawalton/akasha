import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS05e08 = {
  id: "01a18848-3734-73cc-a2bd-e6a53d705412",
  type: "page-type/episode",
  slug: "eureka-s05e08",
  description:
    "Carter's romantic surprise for Allison turns deadly when they're trapped in a sinking marine lab with time and oxygen quickly running out.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-5"],
  position: 8,
  publishedAt: "2012-06-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335299",
      externalLink: "https://www.themoviedb.org/tv/4620/season/5/episode/8",
    },
  ],
  title: "In Too Deep",
  episodeType: "standard",
  stillPath: "/tRdyY5b9adUgoOwcsxHQEHGgbfZ.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
