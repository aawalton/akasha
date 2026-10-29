import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS02e07 = {
  id: "01a1884b-ef63-78a1-adf1-100bd300a6df",
  type: "page-type/episode",
  slug: "ncis-s02e07",
  description:
    "Ernie Yost, an elder Marine veteran confesses to murdering his best friend almost 60 years ago in a war battle. The NCIS's job is to solve the secrets and save Ernie from prison.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-2"],
  position: 7,
  publishedAt: "2004-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334502",
      externalLink: "https://www.themoviedb.org/tv/4614/season/2/episode/7",
    },
  ],
  title: "Call of Silence",
  episodeType: "standard",
  stillPath: "/8C7cRkddKHH09KTL2laSWMkyOSz.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
