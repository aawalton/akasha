import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS03e19 = {
  id: "01a18852-d433-7836-99b1-71c0aa1d0e28",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s03e19",
  description:
    "While dissension among Xindi ranks festers, Enterprise tries to recover from a devastating attack.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-3"],
  position: 19,
  publishedAt: "2004-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15593",
      externalLink: "https://www.themoviedb.org/tv/314/season/3/episode/19",
    },
  ],
  title: "Damage",
  episodeType: "standard",
  stillPath: "/qcmwWAkdDoY7L1Jvr2xmrOJEiYI.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
