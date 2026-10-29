import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const cloneWarsS05e05 = {
  id: "01a18844-6110-75fe-b810-4db99d9f50b6",
  type: "page-type/episode",
  slug: "clone-wars-s05e05",
  description:
    "As a full-scale revolt embroils Onderon, the rebels strike a decisive blow against the planet's Separatist-aligned king. Unfortunately for the rebels, such victory comes at a high price.",
  ownLength: 22,
  ownProgress: 0,
  partOfCollections: ["season/clone-wars-season-5"],
  position: 5,
  publishedAt: "2012-10-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1010366",
      externalLink: "https://www.themoviedb.org/tv/4194/season/5/episode/5",
    },
  ],
  title: "Tipping Points",
  episodeType: "standard",
  stillPath: "/5glhDizESigQmwGWJWLscIbqZNN.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:25:45.098Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Episode
