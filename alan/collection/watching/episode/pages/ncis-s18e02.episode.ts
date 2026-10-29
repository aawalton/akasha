import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS18e02 = {
  id: "01a1884b-ef7a-779e-aa65-eeedfcf82bcd",
  type: "page-type/episode",
  slug: "ncis-s18e02",
  description:
    "Flashbacks reveal the murder case that first introduced young Gibbs to NCIS and his introduction to young, new-to-America Ducky.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-18"],
  position: 2,
  publishedAt: "2020-11-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2516524",
      externalLink: "https://www.themoviedb.org/tv/4614/season/18/episode/2",
    },
  ],
  title: "Everything Starts Somewhere",
  episodeType: "standard",
  stillPath: "/orcQqdzFWQw6Nfdros7TsX44ojA.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
