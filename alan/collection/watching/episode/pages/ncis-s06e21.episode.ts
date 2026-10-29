import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS06e21 = {
  id: "01a1884b-ef69-79fb-a825-7c9de382418a",
  type: "page-type/episode",
  slug: "ncis-s06e21",
  description:
    "When a government scientist goes missing, Abby is recruited to carry on his work, but the team worries that she may meet the same fate as her predecessor.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-6"],
  position: 21,
  publishedAt: "2009-04-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334425",
      externalLink: "https://www.themoviedb.org/tv/4614/season/6/episode/21",
    },
  ],
  title: "Toxic",
  episodeType: "standard",
  stillPath: "/cwFZFy33bvJQlbo8CuHkgDWA3IN.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
