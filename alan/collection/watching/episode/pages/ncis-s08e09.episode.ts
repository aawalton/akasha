import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e09 = {
  id: "01a1884b-ef6c-7d0a-b248-60d4b8f7ae52",
  type: "page-type/episode",
  slug: "ncis-s08e09",
  description:
    "The team scrambles for answers after a shocking ambush reveals a new twist to their current investigation.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 9,
  publishedAt: "2010-11-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334575",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/9",
    },
  ],
  title: "Enemies Domestic (2)",
  episodeType: "standard",
  stillPath: "/7vqXXTBLFGHihoCJCIvYha50GfI.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
