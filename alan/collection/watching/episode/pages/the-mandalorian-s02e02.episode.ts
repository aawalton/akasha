import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e02 = {
  id: "01a18857-7c28-78b5-ae7d-d0c3b07dce15",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e02",
  description: "The Mandalorian must ferry a passenger with precious cargo on a risky journey.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 2,
  publishedAt: "2020-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2464374",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/2",
    },
  ],
  title: "Chapter 10: The Passenger",
  episodeType: "standard",
  stillPath: "/kAuS7h8qVLokHcKpSwZMum4PhC2.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
