import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const andorS01e01 = {
  id: "01a18843-186f-7a9e-8598-919ea32c25e7",
  type: "page-type/episode",
  slug: "andor-s01e01",
  description: "Cassian Andor's reckless search for answers about his past makes him a wanted man.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-andor-season-1"],
  position: 1,
  publishedAt: "2022-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2625077",
      externalLink: "https://www.themoviedb.org/tv/83867/season/1/episode/1",
    },
  ],
  title: "Kassa",
  episodeType: "standard",
  stillPath: "/mOL38zvzT4Xu1gcFNwzhtQfQVsc.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:24:20.975Z",
  updatedAt: "2026-10-29T15:24:20.975Z",
} as const satisfies Episode
