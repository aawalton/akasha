import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e02 = {
  id: "01a1884a-e0eb-7840-b7b1-b3c483bc357c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e02",
  description:
    "A drone strike on a bomb-making compound in Afghanistan reveals the body of a recently retired Marine, leaving the NCIS: LA team to investigate why the Marine returned to Afghanistan and whether or not he betrayed the country he fought for.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 2,
  publishedAt: "2012-10-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557351",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/2",
    },
  ],
  title: "Recruit",
  episodeType: "standard",
  stillPath: "/11KXQdcvw3t7Kf5ae72XXyLawYM.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
