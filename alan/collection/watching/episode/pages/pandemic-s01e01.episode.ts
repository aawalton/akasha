import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const pandemicS01e01 = {
  id: "01a18850-48f3-79a1-ba14-59a290d71f63",
  type: "page-type/episode",
  slug: "pandemic-s01e01",
  description:
    "The bird flu virus spreads through Los Angeles as a doctor from the CDC races to find a vaccine",
  ownLength: 68,
  ownProgress: 0,
  partOfCollections: ["season/pandemic-season-1"],
  position: 1,
  publishedAt: "2007-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1446869",
      externalLink: "https://www.themoviedb.org/tv/41322/season/1/episode/1",
    },
  ],
  title: "Part 1",
  episodeType: "standard",
  voteAverage: 8,
  createdAt: "2026-10-29T15:38:45.363Z",
  updatedAt: "2026-10-29T15:38:45.363Z",
} as const satisfies Episode
