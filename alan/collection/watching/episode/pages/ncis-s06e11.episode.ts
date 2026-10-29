import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e11 = {
  id: "01a1884b-ef69-71b7-b263-043829f228a5",
  type: "page-type/episode",
  slug: "ncis-s06e11",
  description:
    "During the week of Christmas, the NCIS team is forced to work overtime when they discover their prime suspect had been dead for 17 years.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 11,
  publishedAt: "2008-12-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334415",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/11",
    },
  ],
  title: "Silent Night",
  episodeType: "mid-season",
  stillPath: "/mKrgFROQAvy2IauMGvsYBPwUtip.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
