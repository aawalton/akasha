import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const attackOnTitanS03e03 = {
  id: "01a183d1-6a24-7b29-9e1d-52b25423636b",
  type: "page-type/episode",
  slug: "attack-on-titan-s03e03",
  description:
    "Historia and Erwin look back on their past, revealing a shady government with a hidden agenda and inspiration for an uprising.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/attack-on-titan-season-3"],
  position: 3,
  publishedAt: "2018-08-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1530238",
      externalLink: "https://www.themoviedb.org/tv/1429/season/3/episode/3",
    },
  ],
  title: "Old Story",
  episodeType: "standard",
  stillPath: "/40NoDcR6HqiUlMmuO84cC3BfW56.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:41:41.918Z",
  updatedAt: "2026-10-28T18:41:41.918Z",
} as const satisfies Episode
