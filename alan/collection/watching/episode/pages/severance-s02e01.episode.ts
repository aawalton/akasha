import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const severanceS02e01 = {
  id: "01a1887f-8747-75d0-96f8-7b113dba2f8a",
  type: "page-type/episode",
  slug: "severance-s02e01",
  description:
    "Mark returns to work under different circumstances. Secrets from the Outie world come to light.",
  ownLength: 54,
  ownProgress: 54,
  partOfCollections: ["season/severance-season-2"],
  position: 1,
  publishedAt: "2025-01-16",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5469028",
      externalLink: "https://www.themoviedb.org/tv/95396/season/2/episode/1",
    },
  ],
  title: "Hello, Ms. Cobel",
  episodeType: "standard",
  stillPath: "/a97vNY8Knu45FLQib0uQZ2VReLy.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:30:21.510Z",
  updatedAt: "2026-10-29T16:30:21.510Z",
} as const satisfies Episode
