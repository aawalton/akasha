import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisLosAngelesS01e19 = {
  id: "01a1884a-e0e8-7694-bff8-2e3dbff657f3",
  type: "page-type/episode",
  slug: "ncis-los-angeles-s01e19",
  description:
    "When an undercover operation has the NCIS team investigating a MMA gym and its fighters, Sam Hanna is tasked with donning gloves and entering the cage for a one-on-one fight.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/ncis-los-angeles-season-1"],
  position: 19,
  publishedAt: "2010-04-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "557290",
      externalLink: "https://www.themoviedb.org/tv/17610/season/1/episode/19",
    },
  ],
  title: "Hand-to-Hand",
  episodeType: "standard",
  stillPath: "/o1qXfm7WoeoDdFrC1LwDoEkNZGz.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:32:51.047Z",
  updatedAt: "2026-10-29T15:32:51.047Z",
} as const satisfies Episode
