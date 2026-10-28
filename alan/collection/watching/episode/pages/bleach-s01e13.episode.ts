import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e13 = {
  id: "01a183d3-f46e-740c-a59e-a56e1c3084af",
  type: "page-type/episode",
  slug: "bleach-s01e13",
  description: "Orihime Inoue gains a new power in order to protect Tatsuki Arisawa.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 13,
  publishedAt: "2004-12-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750583",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/13",
    },
  ],
  title: "Flower and Hollow",
  episodeType: "standard",
  stillPath: "/m5uys78Y23oNqXXyv79YtHEHuBI.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
