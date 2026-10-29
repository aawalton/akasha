import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e03 = {
  id: "01a18843-1870-749f-b2fa-a9d149f46778",
  type: "page-type/episode",
  slug: "andor-s02e03",
  description: "Time is running out for everyone.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 3,
  publishedAt: "2025-04-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747432",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/3",
    },
  ],
  title: "Harvest",
  episodeType: "standard",
  stillPath: "/jAjYowkxQXG13fu0c3Kov4VZUew.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
