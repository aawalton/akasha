import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoShippudenS01e07 = {
  id: "01a183d2-3bd4-7863-8536-aef50977d9fd",
  type: "page-type/episode",
  slug: "naruto-shippuden-s01e07",
  description:
    "Gaara, his strength completely exhausted, is whisked away by Deidara. Kankuro ignores Baki’s efforts to stop him and immediately sets out in pursuit with a platoon to rescue Gaara.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/naruto-shippuden-season-1"],
  position: 7,
  publishedAt: "2007-03-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "761478",
      externalLink: "https://www.themoviedb.org/tv/31910/season/1/episode/7",
    },
  ],
  title: "Run, Kankuro",
  episodeType: "standard",
  stillPath: "/lDRKaN01rj4SGlWJG5kSiBSVHKj.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:42:35.603Z",
  updatedAt: "2026-10-28T18:42:35.603Z",
} as const satisfies Episode
