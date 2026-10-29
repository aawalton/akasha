import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS05e12 = {
  id: "01a1884b-ef68-7f14-a383-df7dbbd2d062",
  type: "page-type/episode",
  slug: "ncis-s05e12",
  description:
    "The NCIS team go on a stakeout in a warehouse to catch a suspected thief of a high-tech Naval radar, but they accidentally end up witnessing a murder.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-5"],
  position: 12,
  publishedAt: "2008-04-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334464",
      externalLink: "https://www.themoviedb.org/tv/4614/season/5/episode/12",
    },
  ],
  title: "Stakeout",
  episodeType: "standard",
  stillPath: "/1OZDSQ2q7OknowZAAsZpgXSgODv.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
