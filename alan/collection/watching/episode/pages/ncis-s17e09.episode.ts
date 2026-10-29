import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e09 = {
  id: "01a1884b-ef79-71e4-8b4b-7b67da67c2fd",
  type: "page-type/episode",
  slug: "ncis-s17e09",
  description:
    "The NCIS team investigates a Petty Officer's murder that was livestreamed on a popular gaming app.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 9,
  publishedAt: "2019-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1995495",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/9",
    },
  ],
  title: "IRL",
  episodeType: "standard",
  stillPath: "/pB8TDOJirnaq2eARSTnZ164s7AT.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
