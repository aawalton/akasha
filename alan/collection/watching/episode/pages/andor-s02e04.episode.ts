import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS02e04 = {
  id: "01a18843-1870-71dd-b2a8-fce3f27816b2",
  type: "page-type/episode",
  slug: "andor-s02e04",
  description:
    "Cassian and Bix adjust to a Luthen safehouse. All eyes are on Ghorman. Wilmon visits Saw Gerrera.",
  ownLength: 57,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-2"],
  position: 4,
  publishedAt: "2025-04-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5747433",
      externalLink: "https://www.themoviedb.org/tv/83867/season/2/episode/4",
    },
  ],
  title: "Ever Been to Ghorman?",
  episodeType: "standard",
  stillPath: "/8feBkqFpkTRtR4F3GYoXlUhA1Zm.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
