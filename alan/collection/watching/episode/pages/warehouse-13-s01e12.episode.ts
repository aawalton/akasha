import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const warehouse13S01e12 = {
  id: "01a18859-886f-7e9e-b404-6be5f9273364",
  type: "page-type/episode",
  slug: "warehouse-13-s01e12",
  description:
    "The team discovers that MacPherson is auctioning artifacts he has siphoned from the Warehouse shelves.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/warehouse-13-season-1"],
  position: 12,
  publishedAt: "2009-09-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "541573",
      externalLink: "https://www.themoviedb.org/tv/15819/season/1/episode/12",
    },
  ],
  title: "MacPherson",
  episodeType: "finale",
  stillPath: "/20aWx04dPhxFvicEw39qjLT6Vnu.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:48:51.438Z",
  updatedAt: "2026-10-29T15:48:51.438Z",
} as const satisfies Episode
