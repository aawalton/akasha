import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackButlerSeason5 = {
  id: "01a183d8-99a9-7946-a13c-2e208fe773f5",
  type: "page-type/season",
  slug: "black-butler-season-5",
  description:
    "Ciel and his loyal butler Sebastian brave a cursed forest in Germany to uncover the truth behind eerie deaths.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/black-butler"],
  position: 5,
  publishedAt: "2025-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "401241",
      externalLink: "https://www.themoviedb.org/tv/50712/season/5",
    },
  ],
  title: "Emerald Witch Arc",
  posterPath: "/4ZhsJ9BA2X6GTUkiMKV0xYgSmcx.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Season
