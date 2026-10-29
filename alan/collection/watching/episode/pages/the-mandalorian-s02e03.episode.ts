import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMandalorianS02e03 = {
  id: "01a18857-7c28-7695-ae73-ba545e22384b",
  type: "page-type/episode",
  slug: "the-mandalorian-s02e03",
  description: "The Mandalorian braves high seas and meets unexpected allies.",
  ownLength: 37,
  ownProgress: 0,
  partOfCollections: ["season/the-mandalorian-season-2"],
  position: 3,
  publishedAt: "2020-11-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2464375",
      externalLink: "https://www.themoviedb.org/tv/82856/season/2/episode/3",
    },
  ],
  title: "Chapter 11: The Heiress",
  episodeType: "standard",
  stillPath: "/gnZOQajf33N3BzRouIZU3NM45TY.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:46:37.224Z",
  updatedAt: "2026-10-29T15:46:37.224Z",
} as const satisfies Episode
