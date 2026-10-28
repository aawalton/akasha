import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const freeSeason3 = {
  id: "01a183d7-ce6d-736a-a9f3-dd7eb65a6efc",
  type: "page-type/season",
  slug: "free-season-3",
  description:
    "Haruka, who is attending college in Tokyo, meets Asahi again and reawakens his memories from his middle school years, including those of Ikuya. Makoto is working toward a new dream while he is in Tokyo together with Haruka. Rin has an unexpected meeting in Sydney.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/free"],
  position: 3,
  publishedAt: "2018-07-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "104986",
      externalLink: "https://www.themoviedb.org/tv/61456/season/3",
    },
  ],
  title: "Free! Dive to the Future",
  posterPath: "/59BAqCfOMH3FiZRHo1LW4GibeO.jpg",
  voteAverage: 3,
  createdAt: "2026-10-28T18:48:40.810Z",
  updatedAt: "2026-10-28T18:48:40.810Z",
} as const satisfies Season
