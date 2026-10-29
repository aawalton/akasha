import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS20e06 = {
  id: "01a1884b-ef81-78ab-8714-4f7ddd83a05a",
  type: "page-type/episode",
  slug: "ncis-s20e06",
  description:
    "When an NCIS agent turns up dead and Kasie goes unaccounted for, the team must work quickly to find the killer.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-20"],
  position: 6,
  publishedAt: "2022-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3993970",
      externalLink: "https://www.themoviedb.org/tv/4614/season/20/episode/6",
    },
  ],
  title: "The Good Fighter",
  episodeType: "standard",
  stillPath: "/b21hgaxeR0PznXLVsjOyRzHMuJs.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
