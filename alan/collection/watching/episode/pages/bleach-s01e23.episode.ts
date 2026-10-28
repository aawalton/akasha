import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e23 = {
  id: "01a183d3-f475-7b39-80e4-2317b4c4538c",
  type: "page-type/episode",
  slug: "bleach-s01e23",
  description: "Ichigo Kurosaki and his friends enter the household of the Shiba Clan.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 23,
  publishedAt: "2005-03-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1517139",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/23",
    },
  ],
  title: "14 Days Before Rukia's Execution",
  episodeType: "standard",
  stillPath: "/k48W1bMRmxhUen4uUEQpc8SDlDs.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
