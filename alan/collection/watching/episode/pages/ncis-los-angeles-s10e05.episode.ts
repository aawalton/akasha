import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e05 = {
  id: "01a1884a-e0f3-7ff5-88d1-30dc392f4eb5",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e05",
  description:
    "While assisting NCIS with an undercover operation, informant Elizabeth Williams is arrested and the team is unable to provide her with an alibi. Also, Callen meets with ATF Agent Anna Kolcheck who remains on suspension following her last joint case.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 5,
  publishedAt: "2018-10-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598877",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/5",
    },
  ],
  title: "Pro Se",
  episodeType: "standard",
  stillPath: "/qmnmMSMhurGNQCBr3J4M3iBNLrd.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
