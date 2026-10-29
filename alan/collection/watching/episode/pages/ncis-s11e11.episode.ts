import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e11 = {
  id: "01a1884b-ef71-7a73-bf9c-80e36391b30f",
  type: "page-type/episode",
  slug: "ncis-s11e11",
  description:
    "After a mysterious illness strikes children from military families, Gibbs and the team investigate the cause. Abby and Jimmy partner with the Naval Medical Research Center to determine the strain of illness, all in hopes of delivering a cure before the holidays.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 11,
  publishedAt: "2013-12-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "968998",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/11",
    },
  ],
  title: "Homesick",
  episodeType: "mid-season",
  stillPath: "/oEtW0jhfFhUM3YSrn08G6g3xpUQ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
