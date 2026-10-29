import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e02 = {
  id: "01a18852-d432-7d56-97f1-1a765b48f615",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e02",
  description:
    "Enterprise starts experiencing effects of the spatial distortions pervading the Delphic Expanse, and falls victim to predatory aliens.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 2,
  publishedAt: "2003-09-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15598",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/2",
    },
  ],
  title: "Anomaly",
  episodeType: "standard",
  stillPath: "/jQVOUJfejOwPCJ899pTQNfdgrQ9.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
