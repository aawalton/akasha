import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e04 = {
  id: "01a1884a-e0eb-7b45-8058-45ac724306ef",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e04",
  description:
    "The NCIS: LA team investigates the tragic death of a U.S. senatorial candidate’s staffer who is run over crossing the street. The high-profile case becomes a matter of national security as the agents must determine whether it is an isolated tragic incident or a politically connected plot that might put others in danger.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 4,
  publishedAt: "2012-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557353",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/4",
    },
  ],
  title: "Dead Body Politic",
  episodeType: "standard",
  stillPath: "/qIGFo06tzb1LW10VYBHA3XE74ZS.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
