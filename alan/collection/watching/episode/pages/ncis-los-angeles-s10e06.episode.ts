import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e06 = {
  id: "01a1884a-e0f3-740c-bfc1-037594fe6479",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e06",
  description:
    "The NCIS team attempts to locate Mosley after she murders a cartel hitman and goes off the grid.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 6,
  publishedAt: "2018-11-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1598878",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/6",
    },
  ],
  title: "Asesinos",
  episodeType: "standard",
  stillPath: "/bFTD3DVpmZkDtIA9wcaMhGIaDk2.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
