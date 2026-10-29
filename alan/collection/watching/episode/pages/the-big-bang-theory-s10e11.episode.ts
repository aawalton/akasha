import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS10e11 = {
  id: "01a18856-4009-7381-acb9-3bd99ec4d254",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s10e11",
  description:
    "Howard and Bernadette welcome their new baby and Sheldon and Amy celebrate Amy’s birthday.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-10"],
  position: 11,
  publishedAt: "2016-12-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1247340",
      externalLink: "https://www.themoviedb.org/tv/1418/season/10/episode/11",
    },
  ],
  title: "The Birthday Synchronicity",
  episodeType: "mid-season",
  stillPath: "/3FkVpR8xDoXlJ4E07JpwkTknaWK.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
