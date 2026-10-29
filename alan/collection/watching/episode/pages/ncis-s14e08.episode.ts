import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e08 = {
  id: "01a1884b-ef75-7cf6-989a-8f0fde7edf63",
  type: "page-type/episode",
  slug: "ncis-s14e08",
  description:
    "After NCIS Agent Bishop is sent to Gitmo to gather evidence for a Navy chaplain murder case, she questions her previous work at the NSA.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 8,
  publishedAt: "2016-11-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1236295",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/8",
    },
  ],
  title: "Enemy Combatant",
  episodeType: "standard",
  stillPath: "/cT7RxGdvYkoF7t772qH1GlF9NQW.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
