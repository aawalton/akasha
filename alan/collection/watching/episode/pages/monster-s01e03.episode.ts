import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e03 = {
  id: "01a183d8-0265-7fbf-86e7-22e6e32de5cd",
  type: "page-type/episode",
  slug: "monster-s01e03",
  description:
    "Things look brighter for Dr. Tenma, now that Dr. Heinemann is dead. His career takes off, and even Eva tries to win him back. But unfortunately, all that success has drawn the attention of Detective Lunge.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 3,
  publishedAt: "2004-04-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749516",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/3",
    },
  ],
  title: "A Murder",
  episodeType: "standard",
  stillPath: "/nMQqe7HJH1Dk8F6ALS1nbfFWXL0.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
