import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS10e16 = {
  id: "01a1884a-e0f3-7cfb-8cc0-5b0eb05a64ef",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s10e16",
  description:
    "The NCIS team investigates the murder of a journalist who was writing an exposé on a mishandled classified military operation. Also, as their wedding day quickly approaches, Kensi and Deeks work on the last remaining items on their to-do list.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-10"],
  position: 16,
  publishedAt: "2019-03-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1695395",
      externalLink: "https://www.themoviedb.org/tv/17610/season/10/episode/16",
    },
  ],
  title: "Into the Breach",
  episodeType: "standard",
  stillPath: "/qfEAqC87vneJL1rzrOZe37qAtCN.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
