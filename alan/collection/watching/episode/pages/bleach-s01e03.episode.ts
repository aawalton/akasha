import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e03 = {
  id: "01a183d3-f46c-773c-88d6-d51c517a30ba",
  type: "page-type/episode",
  slug: "bleach-s01e03",
  description:
    "When a Hollowfied Sora Inoue attacks his younger sister, Ichigo Kurosaki and Rukia Kuchiki set out to save her.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 3,
  publishedAt: "2004-10-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750574",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/3",
    },
  ],
  title: "The Older Brother's Wish, the Younger Sister's Wish",
  episodeType: "standard",
  stillPath: "/kxEgLT87fYJ9BgzuYTpjojcviOz.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
