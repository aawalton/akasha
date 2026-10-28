import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e02 = {
  id: "01a183d3-f46c-7c59-aa31-311b80947daf",
  type: "page-type/episode",
  slug: "bleach-s01e02",
  description:
    "After becoming a Shinigami, Ichigo Kurosaki refuses to help Rukia Kuchiki with her work as the local Shinigami of Karakura Town.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 2,
  publishedAt: "2004-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750575",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/2",
    },
  ],
  title: "A Shinigami's Work",
  episodeType: "standard",
  stillPath: "/gxi29dkEwdfgVkDzvHn26mw3mYV.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
