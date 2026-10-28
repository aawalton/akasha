import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e26 = {
  id: "01a183d3-f477-7b80-a1c2-9f073b9cafc8",
  type: "page-type/episode",
  slug: "bleach-s01e26",
  description:
    "Ichigo Kurosaki and his friends are scattered throughout the Seireitei, where they encounter new enemies.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 26,
  publishedAt: "2005-04-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1517143",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/26",
    },
  ],
  title: "Formation! The Worst Tag",
  episodeType: "standard",
  stillPath: "/xFZUVf48ZGXX3APUn2jTTOHbn18.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
