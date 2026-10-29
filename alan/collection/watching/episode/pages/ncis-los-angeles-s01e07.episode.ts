import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e07 = {
  id: "01a1884a-e0e8-7673-bf13-d92844ba5f30",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e07",
  description:
    "Following the murder of a Russian woman, the NCIS team uncovers evidence that answers who and why Callen was shot six months ago.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 7,
  publishedAt: "2009-11-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557280",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/7",
    },
  ],
  title: "Pushback",
  episodeType: "standard",
  stillPath: "/aRAe42AtWsMCQWAPSLFHXDqTGRF.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
