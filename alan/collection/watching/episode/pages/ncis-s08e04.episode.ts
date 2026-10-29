import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e04 = {
  id: "01a1884b-ef6c-78c6-98d0-e434080f74c9",
  type: "page-type/episode",
  slug: "ncis-s08e04",
  description:
    "The team hopes to avoid an international incident when an American officer is killed on a British ship.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 4,
  publishedAt: "2010-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334570",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/4",
    },
  ],
  title: "Royals and Loyals",
  episodeType: "standard",
  stillPath: "/iyHovnmXLtsXcCCe5UJc285oSM0.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
