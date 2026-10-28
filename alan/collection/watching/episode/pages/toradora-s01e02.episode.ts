import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const toradoraS01e02 = {
  id: "01a183d9-26d6-7760-b907-d1629c283a24",
  type: "page-type/episode",
  slug: "toradora-s01e02",
  description:
    "Taiga's efforts to get closer to Yūsaku fail: A scheme in basketball ends with Taiga knocked out, and she drops a plate of cookies out a window.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/toradora-season-1"],
  position: 2,
  publishedAt: "2008-10-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "883615",
      externalLink: "https://www.themoviedb.org/tv/42916/season/1/episode/2",
    },
  ],
  title: "Taiga and Ryuji",
  episodeType: "standard",
  stillPath: "/qQT9ghmi9UgVIWM6MG5E65WL89g.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:50:08.982Z",
  updatedAt: "2026-10-28T18:50:08.982Z",
} as const satisfies Episode
