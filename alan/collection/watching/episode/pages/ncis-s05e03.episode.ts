import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e03 = {
  id: "01a1884b-ef67-7651-935e-f7f16e684c24",
  type: "page-type/episode",
  slug: "ncis-s05e03",
  description:
    "Lt. Colonel Mann joins Gibbs in an investigation of the murder of a Marine Captain who had access to highly classified information. Things get very personal for Gibbs when one of the witnesses in the case turns out to be one of his ex-wives.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 3,
  publishedAt: "2007-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334457",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/3",
    },
  ],
  title: "Ex-File",
  episodeType: "standard",
  stillPath: "/rWDqBCMRolIjPUBBMbu8Fb9Qbq1.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
