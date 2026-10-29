import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS09e12 = {
  id: "01a1884a-e0f2-7c53-b0e2-533f4ca840b5",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s09e12",
  description:
    "After napalm is detected at a crime scene, the NCIS team investigates the sole casualty for possible links to terrorism.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-9"],
  position: 12,
  publishedAt: "2018-01-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1404863",
      externalLink: "https://www.themoviedb.org/tv/17610/season/9/episode/12",
    },
  ],
  title: "Under Pressure",
  episodeType: "standard",
  stillPath: "/nstUbjm3Erq2HLieTY4XNTYQ11F.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
