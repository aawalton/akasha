import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS11e01 = {
  id: "01a18856-400a-7acc-892e-9eebfefb989e",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s11e01",
  description:
    "In the eleventh season opener, Amy gives Sheldon an answer to his proposal while Howard and Bernadette struggle with some unexpected news.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-11"],
  position: 1,
  publishedAt: "2017-09-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1343852",
      externalLink: "https://www.themoviedb.org/tv/1418/season/11/episode/1",
    },
  ],
  title: "The Proposal Proposal",
  episodeType: "standard",
  stillPath: "/oBOVgg2gIryBkWg2XtSr0svsO3a.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
