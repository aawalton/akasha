import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e22 = {
  id: "01a1884a-e0e9-71e4-b474-52dffbcb1601",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e22",
  description:
    "The NCIS team is on the hunt for a terrorist who escaped Army custody during a secretive transfer in Los Angeles.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 22,
  publishedAt: "2010-05-11",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557296",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/22",
    },
  ],
  title: "Hunted",
  episodeType: "standard",
  stillPath: "/i8f84Nymz565h01KCNyo2GkKiMC.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
