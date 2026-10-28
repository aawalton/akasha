import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e26 = {
  id: "01a183d8-0266-7d16-959e-3bbfc0b1d298",
  type: "page-type/episode",
  slug: "monster-s01e26",
  description:
    "A man who claims to be the son of a millionaire has committed suicide, and a detective is determined to solve the case.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 26,
  publishedAt: "2004-10-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749541",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/26",
    },
  ],
  title: "The Secret Woods",
  episodeType: "standard",
  stillPath: "/rtdgEwAQtM9b731M1KXwpkKKl41.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
