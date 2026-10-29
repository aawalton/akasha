import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e07 = {
  id: "01a18857-7c29-771f-aeff-d1444c1c88cb",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e07",
  description: "To move against the Empire, the Mandalorian needs the help of an old enemy.",
  ownLength: 40,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 7,
  publishedAt: "2020-12-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2464380",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/7",
    },
  ],
  title: "Chapter 15: The Believer",
  episodeType: "standard",
  stillPath: "/bTzhzNSVFugIyc8pHutmLCJdgv5.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
