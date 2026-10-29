import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e23 = {
  id: "01a1884a-e0f2-726d-9235-4377dfe6e7d2",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e23",
  description:
    "After Sam is shot during a firefight with the cartel, a suspect is interrogated and reveals new information on the whereabouts of Spencer Williams, the man who kidnapped Mosley's son five years ago.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 23,
  publishedAt: "2018-05-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1477394",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/23",
    },
  ],
  title: "A Line in the Sand",
  episodeType: "standard",
  stillPath: "/vZPo045AlXnumV0vOUW2bBbdfxb.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
