import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS02e01 = {
  id: "01a1884a-e0e9-75b0-b99a-12ab30e72291",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s02e01",
  description:
    "When one of their own disappears while undercover, the team must work alongside LAPD on a case involving human-trafficking, money laundering and drugs.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-2"],
  position: 1,
  publishedAt: "2010-09-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557315",
      externalLink: "https://www.themoviedb.org/tv/17610/season/2/episode/1",
    },
  ],
  title: "Human Traffic",
  episodeType: "standard",
  stillPath: "/xVtHZ1vrhTfADiADF6MIKQiwPNn.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
