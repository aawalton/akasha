import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starTrekEnterpriseS02e11 = {
  id: "01a18852-d431-7244-b10a-e7fe4e4eba88",
  type: "page-type/episode",
  slug: "star-trek-enterprise-s02e11",
  description:
    "Trip boards an alien cargo vessel to help repair a stasis pod, which holds a beautiful woman in suspended animation. When the woman accidentally wakes up, she reveals she's not a passenger, but a prisoner.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/star-trek-enterprise-season-2"],
  position: 11,
  publishedAt: "2002-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "15588",
      externalLink: "https://www.themoviedb.org/tv/314/season/2/episode/11",
    },
  ],
  title: "Precious Cargo",
  episodeType: "standard",
  stillPath: "/8ems6fAE0hhBQqneYACAmjOc2vQ.jpg",
  voteAverage: 6.3,
  createdAt: "2026-10-29T15:41:32.079Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Episode
