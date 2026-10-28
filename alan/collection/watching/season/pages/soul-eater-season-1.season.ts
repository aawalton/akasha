import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const soulEaterSeason1 = {
  id: "01a183d9-1621-78cc-81cf-790c22b8ba25",
  type: "page-type/season",
  slug: "soul-eater-season-1",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/soul-eater"],
  position: 1,
  publishedAt: "2008-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "48563",
      externalLink: "https://www.themoviedb.org/tv/37305/season/1",
    },
  ],
  title: "Soul Eater Season 1",
  posterPath: "/9oquS6K8NbQGOlDsw85UrKRMtgT.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:50:04.702Z",
  updatedAt: "2026-10-28T18:50:04.702Z",
} as const satisfies Season
