import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const inhumansS02e01 = {
  id: "01a18849-ba0f-7253-869a-e68ab0d8a3f0",
  type: "page-type/episode",
  slug: "inhumans-s02e01",
  description:
    "A teenaged hired killer stays at Hotel Inhumans while infiltrating a high school for a job.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/inhumans-season-2"],
  position: 1,
  publishedAt: "2026-10-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "7903977",
      externalLink: "https://www.themoviedb.org/tv/276288/season/2/episode/1",
    },
  ],
  title: "Piano Lesson 1",
  episodeType: "standard",
  stillPath: "/5TzkdUqtvXAGrxvD3G8M0Vc8nrr.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:31:35.566Z",
  updatedAt: "2026-10-29T15:31:35.566Z",
} as const satisfies Episode
