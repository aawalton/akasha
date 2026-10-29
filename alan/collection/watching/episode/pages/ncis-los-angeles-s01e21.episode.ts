import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e21 = {
  id: "01a1884a-e0e8-7852-8d9e-1d3c941bacab",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e21",
  description:
    "The NCIS team races to save one of their own when they receive video evidence of Special Agent Dominic Vail being held hostage months after he was kidnapped.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 21,
  publishedAt: "2010-05-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557291",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/21",
    },
  ],
  title: "Found",
  episodeType: "standard",
  stillPath: "/gJ1j2kxq2b5HjNEEpPMtiPQJ7EW.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
