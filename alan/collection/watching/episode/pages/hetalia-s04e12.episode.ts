import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e12 = {
  id: "01a183d7-7ce6-7865-b5c5-b516441355a5",
  type: "page-type/episode",
  slug: "hetalia-s04e12",
  description:
    "It's Halloween night, and America wants Japan to help him finally win a Halloween prank war against undefeated England.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 12,
  publishedAt: "2013-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826976",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/12",
    },
  ],
  title: "Merry Halloween!",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
