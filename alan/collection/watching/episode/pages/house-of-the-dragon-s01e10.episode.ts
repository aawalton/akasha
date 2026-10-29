import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const houseOfTheDragonS01e10 = {
  id: "01a18849-a937-7801-bb5f-56ec028cc506",
  type: "page-type/episode",
  slug: "house-of-the-dragon-s01e10",
  description:
    "Mourning a tragic death, Rhaenyra tries to hold the kingdom together and Daemon prepares for war.",
  ownLength: 59,
  ownProgress: 0,
  partOfCollections: ["season/house-of-the-dragon-season-1"],
  position: 10,
  publishedAt: "2022-10-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "3846982",
      externalLink: "https://www.themoviedb.org/tv/94997/season/1/episode/10",
    },
  ],
  title: "The Black Queen",
  episodeType: "finale",
  stillPath: "/yt0vxevGHtSug3xxxEGCAk2XY1i.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:31:31.254Z",
  updatedAt: "2026-10-29T15:31:31.254Z",
} as const satisfies Episode
