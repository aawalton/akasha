import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS03e07 = {
  id: "01a1884a-e0ea-77c6-a667-496386f5dfaf",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s03e07",
  description:
    "The NCIS team must determine whether a dishonorably discharged Marine is the target of an international set-up or if he committed murder",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-3"],
  position: 7,
  publishedAt: "2011-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557332",
      externalLink: "https://www.themoviedb.org/tv/17610/season/3/episode/7",
    },
  ],
  title: "Honor",
  episodeType: "standard",
  stillPath: "/378t52Iq03dUtU1dAVncxFLWsCl.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
