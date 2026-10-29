import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e09 = {
  id: "01a1884a-e0f2-7b19-b008-76c0a3f53f9c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e09",
  description:
    "Callen and the team question CIA Agent Joelle Taylor's backstory after she escapes from a kidnapping and turns to Callen for help.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 9,
  publishedAt: "2017-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1398137",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/9",
    },
  ],
  title: "Fool Me Twice",
  episodeType: "standard",
  stillPath: "/98JxofS2SdolPE09r44UHYWx8LY.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
