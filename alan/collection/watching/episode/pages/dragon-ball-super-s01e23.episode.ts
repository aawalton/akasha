import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e23 = {
  id: "01a183dc-a494-7268-b454-22b805212d2b",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e23",
  description: "Goku and Vegeta hear of Frieza's return and quickly teleport to Earth.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 23,
  publishedAt: "2015-12-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158811",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/23",
    },
  ],
  title: "Earth! Gohan! Both on the Ropes! Hurry and Get Here, Goku!!",
  episodeType: "standard",
  stillPath: "/kBfBPoeyI1TtS6DdmhdBkiMTCU5.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
