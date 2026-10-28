import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e28 = {
  id: "01a183d8-0266-77f5-86f7-2ce62492fc19",
  type: "page-type/episode",
  slug: "monster-s01e28",
  description: "Richard re-investigates his old homicide cases and makes a frightening discovery.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 28,
  publishedAt: "2004-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749543",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/28",
    },
  ],
  title: "Just One Case",
  episodeType: "standard",
  stillPath: "/4ScD6otPzx2B7r5mTvPw0PdyHMf.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
