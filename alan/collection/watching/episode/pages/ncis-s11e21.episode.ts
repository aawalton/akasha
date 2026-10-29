import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS11e21 = {
  id: "01a1884b-ef71-726a-9be5-040847dfad5d",
  type: "page-type/episode",
  slug: "ncis-s11e21",
  description:
    "After a Navy officer is found dead on a rural road, the NCIS team must ascertain if his death was the result of a bar fight or because he knew too much about an attack on a fellow female officer.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-11"],
  position: 21,
  publishedAt: "2014-04-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "974338",
      externalLink: "https://www.themoviedb.org/tv/4614/season/11/episode/21",
    },
  ],
  title: "Alleged",
  episodeType: "standard",
  stillPath: "/m7wloexLBbv7GBs4RrkLBzkM1NH.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
