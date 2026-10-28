import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e02 = {
  id: "01a183d8-0265-7a22-8bf2-5502537a6a33",
  type: "page-type/episode",
  slug: "monster-s01e02",
  description:
    "The price for disobeying Dr. Heinemann's orders to operate on the mayor is costly for Dr. Tenma. His career begins to plummet. The boy whom he saved finally awakens, but a horrible incident occurs soon after.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 2,
  publishedAt: "2004-04-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749517",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/2",
    },
  ],
  title: "Downfall",
  episodeType: "standard",
  stillPath: "/yIoVsDbmIduGojXaTR8DzpBbTVr.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
