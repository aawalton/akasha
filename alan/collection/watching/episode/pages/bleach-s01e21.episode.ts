import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e21 = {
  id: "01a183d3-f473-7e90-86a9-48f62c108a26",
  type: "page-type/episode",
  slug: "bleach-s01e21",
  description: "Ichigo Kurosaki and his friends enter Soul Society.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 21,
  publishedAt: "2005-03-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1517137",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/21",
    },
  ],
  title: "Enter! The World of the Shinigami",
  episodeType: "standard",
  stillPath: "/kI7Lqau6OnGmC95XScAPwD8HnVE.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
