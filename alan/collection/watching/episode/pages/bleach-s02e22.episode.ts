import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS02e22 = {
  id: "01a183d3-f483-7d98-91d7-745d216fa0a0",
  type: "page-type/episode",
  slug: "bleach-s02e22",
  description:
    "Ichigo tries to stop Yhwach upon learning that his real target lies within the Royal Palace.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-2"],
  position: 22,
  publishedAt: "2023-09-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4584673",
      externalLink: "https://www.themoviedb.org/tv/30984/season/2/episode/22",
    },
  ],
  title: "MARCHING OUT THE ZOMBIES",
  episodeType: "standard",
  stillPath: "/tFAFOpgFU5AtbYtJNSdf0no3sLs.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
