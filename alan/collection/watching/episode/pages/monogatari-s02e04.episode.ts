import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS02e04 = {
  id: "01a183db-7939-7af0-9a12-d13d4e165858",
  type: "page-type/episode",
  slug: "monogatari-s02e04",
  description:
    "Karen is badly ill, having been poisoned by an evil, supernatural bee. Will Koyomi be able to cure her in time?",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-2"],
  position: 4,
  publishedAt: "2012-01-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "907773",
      externalLink: "https://www.themoviedb.org/tv/46195/season/2/episode/4",
    },
  ],
  title: "Karen Bee (4)",
  episodeType: "standard",
  stillPath: "/3znGWPm5AwdDvPo5fMqulqpXFyQ.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
