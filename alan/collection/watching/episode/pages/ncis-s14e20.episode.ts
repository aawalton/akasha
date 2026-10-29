import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS14e20 = {
  id: "01a1884b-ef75-71d3-bb9f-227b012ff258",
  type: "page-type/episode",
  slug: "ncis-s14e20",
  description:
    "A Vice Admiral tasks McGee with tracking down the hackers who infected his laptop with ransomware before the virus wipes out all his data. The cyberterrorism escalates when the virus spreads to the whole NCIS office.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-14"],
  position: 20,
  publishedAt: "2017-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1288243",
      externalLink: "https://www.themoviedb.org/tv/4614/season/14/episode/20",
    },
  ],
  title: "A Bowl of Cherries",
  episodeType: "standard",
  stillPath: "/1vS0NYHpekPLvcoTzHaOjZhGGnt.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
