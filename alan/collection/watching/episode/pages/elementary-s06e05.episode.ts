import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS06e05 = {
  id: "01a1887e-62ae-7dd4-aae8-635b41eaa55d",
  type: "page-type/episode",
  slug: "elementary-s06e05",
  description:
    "Holmes and Watson retrace Holmes' steps after Holmes finds himself in possession of a severed head and can't remember anything about the last six hours.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-6"],
  position: 5,
  publishedAt: "2018-05-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1493964",
      externalLink: "https://www.themoviedb.org/tv/1415/season/6/episode/5",
    },
  ],
  title: "Bits and Pieces",
  episodeType: "standard",
  stillPath: "/3yrQQVHLt0rNE5zQuG7nDdqvnY4.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
