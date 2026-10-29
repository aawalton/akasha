import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e19 = {
  id: "01a1884b-ef6d-7eb9-90a7-1087d3c00611",
  type: "page-type/episode",
  slug: "ncis-s08e19",
  description:
    "NCIS connects a message in blood left by a murdered Navy commander to a manuscript that may contain classified military information.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 19,
  publishedAt: "2011-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334585",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/19",
    },
  ],
  title: "Tell-All",
  episodeType: "standard",
  stillPath: "/b0wPW42twM4YEXtJltbp871sd0.jpg",
  voteAverage: 6.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
