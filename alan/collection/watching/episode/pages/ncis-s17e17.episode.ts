import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e17 = {
  id: "01a1884b-ef79-776e-8ad8-0bcc2c177f8b",
  type: "page-type/episode",
  slug: "ncis-s17e17",
  description:
    "As the NCIS team investigates the death of a Navy officer murdered the same way as his parents a decade ago, they stumble across a storage container filled with dollhouses that display recreations of murder scenes.",
  ownLength: 41,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 17,
  publishedAt: "2020-03-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2183148",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/17",
    },
  ],
  title: "In a Nutshell",
  episodeType: "standard",
  stillPath: "/yqdche2k66WdXb7pBUyXMqjXYLL.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
