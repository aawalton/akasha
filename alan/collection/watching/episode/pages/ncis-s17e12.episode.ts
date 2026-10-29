import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS17e12 = {
  id: "01a1884b-ef79-7db2-b4d9-9c4934b62a2e",
  type: "page-type/episode",
  slug: "ncis-s17e12",
  description:
    "The NCIS team investigates an F-18 crash and the subsequent disappearance of the pilot.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-17"],
  position: 12,
  publishedAt: "2020-01-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2048495",
      externalLink: "https://www.themoviedb.org/tv/4614/season/17/episode/12",
    },
  ],
  title: "Flight Plan",
  episodeType: "standard",
  stillPath: "/lLJZFGqfoM80T5R17L6f9qazgZq.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
