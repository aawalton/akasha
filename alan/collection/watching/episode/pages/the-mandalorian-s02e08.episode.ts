import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e08 = {
  id: "01a18857-7c29-79ba-b786-1fc5c2a5075c",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e08",
  description: "The Mandalorian and his allies attempt a daring rescue.",
  ownLength: 48,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 8,
  publishedAt: "2020-12-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2464381",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/8",
    },
  ],
  title: "Chapter 16: The Rescue",
  episodeType: "finale",
  stillPath: "/aNI7U2iJG1cKyTtk656lmmp5iq1.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
