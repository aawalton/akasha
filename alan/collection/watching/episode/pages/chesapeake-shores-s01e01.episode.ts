import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const chesapeakeShoresS01e01 = {
  id: "01a18844-1d33-74c1-ad74-6e55bcef29c8",
  type: "page-type/episode",
  slug: "chesapeake-shores-s01e01",
  description:
    "Abby returns to her hometown after hearing troubling news about the family inn facing foreclosure.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/chesapeake-shores-season-1"],
  position: 1,
  publishedAt: "2016-08-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1210845",
      externalLink: "https://www.themoviedb.org/tv/67265/season/1/episode/1",
    },
  ],
  title: "Pilot",
  episodeType: "standard",
  stillPath: "/bJv0IWFad1VGm1Yp7ctGP4XIORm.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:25:27.731Z",
  updatedAt: "2026-10-29T15:25:27.731Z",
} as const satisfies Episode
