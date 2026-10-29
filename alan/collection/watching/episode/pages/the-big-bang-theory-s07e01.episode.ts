import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS07e01 = {
  id: "01a18856-4004-7b8b-a799-6d731b16501f",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s07e01",
  description:
    "With Leonard away, Sheldon and Penny spend quality time together sharing intimate secrets. Also, Wolowitz helps Raj get over his ex-girlfriend.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-7"],
  position: 1,
  publishedAt: "2013-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64778",
      externalLink: "https://www.themoviedb.org/tv/1418/season/7/episode/1",
    },
  ],
  title: "The Hofstadter Insufficiency",
  episodeType: "standard",
  stillPath: "/nf766vILhf88IUK49TE6kzN125n.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
