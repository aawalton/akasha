import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS03e01 = {
  id: "01a183d1-6a24-74ac-bf1a-27667bc0437d",
  type: "page-type/episode",
  slug: "attack-on-titan-s03e01",
  description:
    "After barely surviving Eren's recovery, a rising threat from the shadows puts everyone's lives in danger again.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-3"],
  position: 1,
  publishedAt: "2018-07-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1518847",
      externalLink: "https://www.themoviedb.org/tv/1429/season/3/episode/1",
    },
  ],
  title: "Smoke Signal",
  episodeType: "standard",
  stillPath: "/g5gdbz4MUxHYAakgFeHfAOQMIvs.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
