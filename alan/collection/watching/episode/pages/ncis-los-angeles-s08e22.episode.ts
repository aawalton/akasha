import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS08e22 = {
  id: "01a1884a-e0f1-73b4-ad9e-9109561ec35d",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s08e22",
  description:
    "A gold heist investigation has the NCIS team working with Hetty's former Vietnam War colleagues, Retired Admiral AJ Chegwidden, Admiral Sterling Bridges and Retired Captain Charles Langston.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-8"],
  position: 22,
  publishedAt: "2017-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1302046",
      externalLink: "https://www.themoviedb.org/tv/17610/season/8/episode/22",
    },
  ],
  title: "Golden Days (2)",
  episodeType: "standard",
  stillPath: "/e11L8PkMzj57Ti8Aeu3SywPnXWG.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
