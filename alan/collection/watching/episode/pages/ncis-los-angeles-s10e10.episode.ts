import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e10 = {
  id: "01a1884a-e0f3-76b7-86b1-fc9c71505afc",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e10",
  description:
    "An elaborate bank heist to steal a single safe deposit box held by Veronica Stephens, a Navy contractor, leads NCIS to investigate her corrupt consulting firm.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 10,
  publishedAt: "2018-12-09",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1621181",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/10",
    },
  ],
  title: "Heist",
  episodeType: "standard",
  stillPath: "/hoS4FxiwiAli5VtHJvn0VykLVkD.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
