import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const strangerThingsS02e01 = {
  id: "01a18855-9112-77b8-8b43-23b058542926",
  type: "page-type/episode",
  slug: "stranger-things-s02e01",
  description:
    "As the town preps for Halloween, a high-scoring rival shakes things up at the arcade, and a skeptical Hopper inspects a field of rotting pumpkins.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/stranger-things-2"],
  position: 1,
  publishedAt: "2017-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1250983",
      externalLink: "https://www.themoviedb.org/tv/66732/season/2/episode/1",
    },
  ],
  title: "Chapter One: MADMAX",
  episodeType: "standard",
  stillPath: "/efz0MgPAxPw11PIeAJNgKKg3Paa.jpg",
  voteAverage: 8.391,
  createdAt: "2026-10-29T15:44:31.505Z",
  updatedAt: "2026-10-29T15:44:31.505Z",
} as const satisfies Episode
