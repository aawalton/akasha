import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e17 = {
  id: "01a183d3-f471-7eed-bd8e-83414e14ae49",
  type: "page-type/episode",
  slug: "bleach-s01e17",
  description:
    "Ichigo Kurosaki loses his Shinigami powers and Rukia Kuchiki is taken back to Soul Society.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 17,
  publishedAt: "2005-02-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750561",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/17",
    },
  ],
  title: "Ichigo Dies!",
  episodeType: "standard",
  stillPath: "/tX3ol8x4xn3ZADw8O72qFk7yjtl.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
