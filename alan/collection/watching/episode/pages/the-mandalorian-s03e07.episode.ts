import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS03e07 = {
  id: "01a18857-7c29-71a1-b4de-1592f6df4e1e",
  type: "page-type/episode",
  slug: "the-mandalorian-s03e07",
  description: "Survivors come out of hiding.",
  ownLength: 54,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-3"],
  position: 7,
  publishedAt: "2023-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4237597",
      externalLink: "https://www.themoviedb.org/tv/82856/season/3/episode/7",
    },
  ],
  title: "Chapter 23: The Spies",
  episodeType: "standard",
  stillPath: "/38blBPXRWevBgwa4XPVZkc2mMCO.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
