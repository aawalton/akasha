import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e23 = {
  id: "01a1884b-ef6d-7003-b7be-9871ab47d5c0",
  type: "page-type/episode",
  slug: "ncis-s08e23",
  description:
    "After new evidence reveals that the Port-to-Port Killer has infiltrated the agency, the NCIS team chases every lead in a race to track him down.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 23,
  publishedAt: "2011-05-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334587",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/23",
    },
  ],
  title: "Swan Song",
  episodeType: "standard",
  stillPath: "/n7Ozv51tAxH7FnZIOlte4GKnAfr.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
