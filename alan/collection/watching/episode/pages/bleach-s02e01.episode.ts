import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS02e01 = {
  id: "01a183d3-f482-7cce-9ba8-bd2da876835a",
  type: "page-type/episode",
  slug: "bleach-s02e01",
  description:
    "The Soul Society is observing a sudden surge in the number of Hollows being destroyed.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-2"],
  position: 1,
  publishedAt: "2022-10-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3754381",
      externalLink: "https://www.themoviedb.org/tv/30984/season/2/episode/1",
    },
  ],
  title: "The Blood Warfare",
  episodeType: "standard",
  stillPath: "/jMo1WpRVfSdttH492fPxY2rQCyc.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
