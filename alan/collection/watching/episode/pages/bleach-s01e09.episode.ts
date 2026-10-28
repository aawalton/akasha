import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e09 = {
  id: "01a183d3-f46c-7750-8d7b-9b41fb33d401",
  type: "page-type/episode",
  slug: "bleach-s01e09",
  description: "Ichigo Kurosaki battles against Grand Fisher.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 9,
  publishedAt: "2004-11-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750562",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/9",
    },
  ],
  title: "Unbeatable Enemy",
  episodeType: "standard",
  stillPath: "/80LNwWsGEDs433WDwFMlc2OEi20.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
