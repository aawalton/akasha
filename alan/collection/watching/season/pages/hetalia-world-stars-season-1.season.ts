import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const hetaliaWorldStarsSeason1 = {
  id: "01a183d7-8c16-75b7-b2cd-74945542e382",
  type: "page-type/season",
  slug: "hetalia-world-stars-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/hetalia-world-stars"],
  position: 1,
  publishedAt: "2021-04-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "187005",
      externalLink: "https://www.themoviedb.org/tv/121301/season/1",
    },
  ],
  title: "Hetalia: World Stars Season 1",
  posterPath: "/4rk71b1Yb5GqGkeVQysH7GlcOv4.jpg",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:23.830Z",
  updatedAt: "2026-10-28T18:48:23.830Z",
} as const satisfies Season
