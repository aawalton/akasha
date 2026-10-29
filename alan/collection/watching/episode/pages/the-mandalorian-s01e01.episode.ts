import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS01e01 = {
  id: "01a18885-1cd0-7eff-8497-f7df682758fe",
  type: "page-type/episode",
  slug: "the-mandalorian-s01e01",
  description: "A Mandalorian bounty hunter tracks a target for a well-paying client.",
  ownLength: 41,
  ownProgress: 41,
  partOfCollections: ["season/the-mandalorian-season-1"],
  position: 1,
  publishedAt: "2019-11-12",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1586260",
      externalLink: "https://www.themoviedb.org/tv/82856/season/1/episode/1",
    },
  ],
  title: "Chapter 1: The Mandalorian",
  episodeType: "standard",
  stillPath: "/gz1hIpFhZB8tjsdYQQt9MGgPhI.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:36:27.471Z",
  updatedAt: "2026-10-29T16:36:27.471Z",
} as const satisfies Episode
