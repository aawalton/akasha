import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e05 = {
  id: "01a18843-1870-70d6-952e-faffb2ab8214",
  type: "page-type/episode",
  slug: "andor-s02e05",
  description:
    "Cassian on Ghorman. Syril on Coruscant. Bix failing. Wilmon trapped. Kleya has a serious problem.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 5,
  publishedAt: "2025-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747434",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/5",
    },
  ],
  title: "I Have Friends Everywhere",
  episodeType: "standard",
  stillPath: "/vfjuDpEDkEXVFrKRbJK8eZ9OzpZ.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
