import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e07 = {
  id: "01a1884b-ef62-7e24-b7b0-79a996fdef7e",
  type: "page-type/episode",
  slug: "ncis-s01e07",
  description:
    "A decomposed body is discovered in a tub of acid at a Naval base and Ducky and Abby learn that the victim was a submariner. However, there have been no reports of a sub crewmember missing.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 7,
  publishedAt: "2003-11-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334436",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/7",
    },
  ],
  title: "Sub Rosa",
  episodeType: "standard",
  stillPath: "/ki7xqZTkdC2zlzzomq97ur46xBn.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
