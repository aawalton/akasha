import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e02 = {
  id: "01a18849-ba0f-7230-b349-fa360e39a6e5",
  type: "page-type/episode",
  slug: "inhumans-s02e02",
  description:
    "A teenaged hired killer learns about what it takes to play piano and what it takes to be a friend.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 2,
  publishedAt: "2026-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903979",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/2",
    },
  ],
  title: "Piano Lesson 2",
  episodeType: "standard",
  stillPath: "/M1zaSjSyTuNoXwb5pyXTPl9Oeo.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
