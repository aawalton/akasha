import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS09e23 = {
  id: "01a1884b-ef6f-7443-9fe4-d3b673a121b9",
  type: "page-type/episode",
  slug: "ncis-s09e23",
  description:
    "The NCIS team analyzes what secrets could be in the hands of a terrorist targeting the Navy when a high-tech bug is found inside a probationary agent’s tooth.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-9"],
  position: 23,
  publishedAt: "2012-05-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334609",
      externalLink: "https://www.themoviedb.org/tv/4614/season/9/episode/23",
    },
  ],
  title: "Up in Smoke",
  episodeType: "standard",
  stillPath: "/atDGA2RXvJoVhFGFmzgvqVOb2Pj.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
