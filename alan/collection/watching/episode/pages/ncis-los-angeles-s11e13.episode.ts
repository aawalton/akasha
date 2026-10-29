import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS11e13 = {
  id: "01a1884a-e0f4-78aa-8a0a-b3e8ae19762d",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s11e13",
  description:
    "After a rise in deaths caused by black market opioid use, the NCIS team links the street drug to funding for terrorist activities",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-11"],
  position: 13,
  publishedAt: "2020-01-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2045244",
      externalLink: "https://www.themoviedb.org/tv/17610/season/11/episode/13",
    },
  ],
  title: "High Society",
  episodeType: "standard",
  stillPath: "/z71kxjV3g3BhYhYq6Xu7trjAI29.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
