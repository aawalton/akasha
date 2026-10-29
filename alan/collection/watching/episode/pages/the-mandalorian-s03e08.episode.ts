import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e08 = {
  id: "01a18857-7c29-7134-9b2e-f90556cc4189",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e08",
  description: "The Mandalorian and his allies confront their enemies.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 8,
  publishedAt: "2023-04-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4237598",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/8",
    },
  ],
  title: "Chapter 24: The Return",
  episodeType: "finale",
  stillPath: "/blG9C2voVSQlC8M1JkJZgo7BvCL.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
