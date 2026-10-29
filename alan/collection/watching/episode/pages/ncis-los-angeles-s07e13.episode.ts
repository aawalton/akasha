import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS07e13 = {
  id: "01a1884a-e0ef-7ca8-aba6-9ade5b7b767c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s07e13",
  description:
    "The team investigates the murder of tech entrepreneur turned venture capitalist who secretly developed a daemon, a background computer program that allows for undetectable data collection.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-7"],
  position: 13,
  publishedAt: "2016-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1157571",
      externalLink: "https://www.themoviedb.org/tv/17610/season/7/episode/13",
    },
  ],
  title: "Angels & Daemons",
  episodeType: "standard",
  stillPath: "/eav0wiaDJqKtSOR5ZsdZvCv08UJ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
