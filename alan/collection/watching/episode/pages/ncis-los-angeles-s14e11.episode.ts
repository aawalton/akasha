import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS14e11 = {
  id: "01a1884a-e0f7-7ebe-8684-39a9d043a08f",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s14e11",
  description:
    "When Sam's friend Tom Olsen finds himself being hunted down by enemies from his past, the NCIS team must find out who is after him.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-14"],
  position: 11,
  publishedAt: "2023-01-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4150089",
      externalLink: "https://www.themoviedb.org/tv/17610/season/14/episode/11",
    },
  ],
  title: "Best Seller",
  episodeType: "standard",
  stillPath: "/47cg5TDv2PGPijhvWkFqw1aWMf1.jpg",
  voteAverage: 6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
