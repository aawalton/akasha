import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e02 = {
  id: "01a1884b-ef81-7d53-a91f-6d9ee6b2b067",
  type: "page-type/episode",
  slug: "ncis-s20e02",
  description:
    "McGee’s personal life and professional life intersect when a dad from his children’s school is linked to a break-in at a government storage bunker.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 2,
  publishedAt: "2022-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3947646",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/2",
    },
  ],
  title: "Daddy Issues",
  episodeType: "standard",
  stillPath: "/xs74w6KZiIZ4yYJNGrFnCUZoQGK.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
