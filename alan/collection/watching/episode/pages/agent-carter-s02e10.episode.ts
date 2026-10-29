import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const agentCarterS02e10 = {
  id: "01a1887d-8f11-7a7d-9be1-1fb3eb271d1b",
  type: "page-type/episode",
  slug: "agent-carter-s02e10",
  description:
    "Peggy needs Howard Stark to eliminate Zero Matter as they are faced with a mission none of them could come back from.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/marvel-s-agent-carter-season-2"],
  position: 10,
  publishedAt: "2016-03-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1165525",
      externalLink: "https://www.themoviedb.org/tv/61550/season/2/episode/10",
    },
  ],
  title: "Hollywood Ending",
  episodeType: "finale",
  stillPath: "/ylGaVxAjqkjTEygsNTyVJcuL2l.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T16:28:12.432Z",
  updatedAt: "2026-10-29T16:28:12.432Z",
} as const satisfies Episode
