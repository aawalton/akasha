import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS21e02 = {
  id: "01a1884b-ef83-7c75-a691-287b2fbc00ba",
  type: "page-type/episode",
  slug: "ncis-s21e02",
  description:
    "As NCIS mourns the loss of Ducky, the agents find comfort in working on one of his unfinished cases involving a woman whose father was dishonorably discharged from the Marines.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-21"],
  position: 2,
  publishedAt: "2024-02-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5072058",
      externalLink: "https://www.themoviedb.org/tv/4614/season/21/episode/2",
    },
  ],
  title: "The Stories We Leave Behind",
  episodeType: "standard",
  stillPath: "/8nrdF9CJxaLnWcJYrUBkTbObDTv.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
