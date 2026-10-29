import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const iAmGrootS01e05 = {
  id: "01a1887e-c695-77ea-ba23-0627ad0535bf",
  type: "page-type/episode",
  slug: "i-am-groot-s01e05",
  description:
    "Groot sets out to paint a family portrait of himself and the Guardians, only to discover just how messy the artistic process can be.",
  ownLength: 5,
  ownProgress: 5,
  partOfCollections: ["season/i-am-groot-season-1"],
  position: 5,
  publishedAt: "2022-08-10",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4711229",
      externalLink: "https://www.themoviedb.org/tv/232125/season/1/episode/5",
    },
  ],
  title: "Magnum Opus",
  episodeType: "finale",
  stillPath: "/cnhzecqkKHBIyM4QMbxRy5fbW3l.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T16:29:32.180Z",
  updatedAt: "2026-10-29T16:29:32.180Z",
} as const satisfies Episode
