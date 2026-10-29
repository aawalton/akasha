import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS22e05 = {
  id: "01a1884b-ef84-76e0-be1a-a68a4521f568",
  type: "page-type/episode",
  slug: "ncis-s22e05",
  description:
    "NCIS works with the CIA to discover what secrets are being kept by Captain Butler, an elderly former spy with dementia.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-22"],
  position: 5,
  publishedAt: "2024-11-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5686702",
      externalLink: "https://www.themoviedb.org/tv/4614/season/22/episode/5",
    },
  ],
  title: "In from the Cold",
  episodeType: "standard",
  stillPath: "/hnIwgbSFuCqxre2cLfJLxSKxgvc.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
