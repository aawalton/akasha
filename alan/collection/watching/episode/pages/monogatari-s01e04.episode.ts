import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monogatariS01e04 = {
  id: "01a183db-7938-7509-b50d-8983ee63806f",
  type: "page-type/episode",
  slug: "monogatari-s01e04",
  description:
    "Koyomi and Hitagi meet a girl named Mayoi Hachikuji in the park. She seems to be lost and cannot find her way home. The two try to help her.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/monogatari-season-1"],
  position: 4,
  publishedAt: "2009-07-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "907795",
      externalLink: "https://www.themoviedb.org/tv/46195/season/1/episode/4",
    },
  ],
  title: "Mayoi Snail (2)",
  episodeType: "standard",
  stillPath: "/qChfRN1IjjqEXhJcfolMPmXNEut.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-28T18:52:41.143Z",
  updatedAt: "2026-10-28T18:52:41.143Z",
} as const satisfies Episode
