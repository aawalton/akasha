import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS13e19 = {
  id: "01a1884a-e0f7-79af-bea1-0367333755a9",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s13e19",
  description:
    "The NCIS team works with DEA Agent Talia Del Campo to find a missing whistleblower set to testify against gun manufacturers marketing to drug cartels.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-13"],
  position: 19,
  publishedAt: "2022-05-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3658354",
      externalLink: "https://www.themoviedb.org/tv/17610/season/13/episode/19",
    },
  ],
  title: "Live Free or Die Standing",
  episodeType: "standard",
  stillPath: "/3QQzhIbZDPEbVCWXAponYjNGXl0.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
