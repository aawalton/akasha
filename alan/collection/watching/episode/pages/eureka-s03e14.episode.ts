import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const eurekaS03e14 = {
  id: "01a18848-3732-7f17-a62c-5741034a2b6f",
  type: "page-type/episode",
  slug: "eureka-s03e14",
  description:
    "Henry's ship returns causing Carter to fear it maybe linked to the town's deadly electrical anomalies.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/eureka-season-3"],
  position: 14,
  publishedAt: "2009-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "335265",
      externalLink: "https://www.themoviedb.org/tv/4620/season/3/episode/14",
    },
  ],
  title: "Ship Happens",
  episodeType: "standard",
  stillPath: "/stOvVxuax2ruKjsUmQoha1GOCrh.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:29:56.528Z",
  updatedAt: "2026-10-29T15:29:56.528Z",
} as const satisfies Episode
