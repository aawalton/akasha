import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const maidSamaSeason1 = {
  id: "01a183da-f59b-71dd-9a8b-52035a935366",
  type: "page-type/season",
  slug: "maid-sama-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/maid-sama"],
  position: 1,
  publishedAt: "2010-04-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "74720",
      externalLink: "https://www.themoviedb.org/tv/65648/season/1",
    },
  ],
  title: "Maid Sama! Season 1",
  posterPath: "/qk7BgNB8k6donwQagVa9JmYyhU8.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:52:07.450Z",
  updatedAt: "2026-10-28T18:52:07.450Z",
} as const satisfies Season
