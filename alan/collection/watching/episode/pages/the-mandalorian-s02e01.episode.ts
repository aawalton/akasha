import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e01 = {
  id: "01a18857-7c28-7117-a3ec-72ecc90b500d",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e01",
  description: "The Mandalorian is drawn to the Outer Rim in search of others of his kind.",
  ownLength: 56,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 1,
  publishedAt: "2020-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2403865",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/1",
    },
  ],
  title: "Chapter 9: The Marshal",
  episodeType: "standard",
  stillPath: "/n6oeOfj8jMPbXZ2E2QTVXYt5cvO.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
