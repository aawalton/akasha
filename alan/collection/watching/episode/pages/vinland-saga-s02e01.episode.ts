import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const vinlandSagaS02e01 = {
  id: "01a183d4-e9fa-779e-830b-190ca64d7f82",
  type: "page-type/episode",
  slug: "vinland-saga-s02e01",
  description:
    "Einar lives peacefully in northern England with his mother and sister, but then one day, their village comes under attack.",
  ownLength: 26,
  ownProgress: 0,
  partOfCollections: ["season/vinland-saga-season-2"],
  position: 1,
  publishedAt: "2023-01-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3703535",
      externalLink: "https://www.themoviedb.org/tv/88803/season/2/episode/1",
    },
  ],
  title: "Slave",
  episodeType: "standard",
  stillPath: "/39Egg6NtF0yWU9YxLMH35jPceJr.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:45:31.256Z",
  updatedAt: "2026-10-28T18:45:31.256Z",
} as const satisfies Episode
