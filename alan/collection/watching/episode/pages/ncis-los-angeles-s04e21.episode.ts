import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS04e21 = {
  id: "01a1884a-e0ec-759b-a4cc-4155c67a7c0c",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s04e21",
  description:
    "A body is stolen after a special task force successfully takes down an infamous cartel boss, leaving the NCIS: LA team to investigate the leak and track down the missing body.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-4"],
  position: 21,
  publishedAt: "2013-04-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557372",
      externalLink: "https://www.themoviedb.org/tv/17610/season/4/episode/21",
    },
  ],
  title: "Resurrection",
  episodeType: "standard",
  stillPath: "/7mRsPtAHxuzNVpq6qU68SVC57E3.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
