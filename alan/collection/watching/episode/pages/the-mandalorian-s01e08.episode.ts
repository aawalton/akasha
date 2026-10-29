import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e08 = {
  id: "01a18885-1cd0-7034-b4eb-6f36b8a7a9a6",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e08",
  description: "The Mandalorian comes face-to-face with an unexpected enemy.",
  ownLength: 50,
  ownProgress: 50,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 8,
  publishedAt: "2019-12-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2023593",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/8",
    },
  ],
  title: "Chapter 8: Redemption",
  episodeType: "finale",
  stillPath: "/v36aZwxTsPAvqsssLPVno3VFvg5.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
