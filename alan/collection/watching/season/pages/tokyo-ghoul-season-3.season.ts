import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const tokyoGhoulSeason3 = {
  id: "01a183d5-860a-72f0-927d-50871aaca215",
  type: "page-type/season",
  slug: "tokyo-ghoul-season-3",
  description:
    "An exciting new episode unfolds in Tokyo, just two years after the attack on Anteiku. Countering a resurgence of ghouls, the CCG selects young officer Haise Sasaki to lead an unruly team of humans infused with ghoul powers. Known as the Quinx Squad, they cross the line between humans and ghouls to rid the world of its scariest threat. But no one said it would be easy. The hunt is on!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/tokyo-ghoul"],
  position: 3,
  publishedAt: "2018-04-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "99777",
      externalLink: "https://www.themoviedb.org/tv/61374/season/3",
    },
  ],
  title: "Tokyo Ghoul:re",
  posterPath: "/4V0e43ntmqdNyJSuTvRhbwXAv7.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:46:11.206Z",
  updatedAt: "2026-10-28T18:46:11.206Z",
} as const satisfies Season
