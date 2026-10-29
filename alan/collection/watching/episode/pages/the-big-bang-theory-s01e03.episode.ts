import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS01e03 = {
  id: "01a18856-3ffd-704c-b13b-94de0f04a04e",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s01e03",
  description: "Leonard asks a woman out after he finds out that Penny is seeing someone.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-1"],
  position: 3,
  publishedAt: "2007-10-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64765",
      externalLink: "https://www.themoviedb.org/tv/1418/season/1/episode/3",
    },
  ],
  title: "The Fuzzy Boots Corollary",
  episodeType: "standard",
  stillPath: "/eDyDC7cwKz9ZTA4CX44eKuHjPgZ.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
