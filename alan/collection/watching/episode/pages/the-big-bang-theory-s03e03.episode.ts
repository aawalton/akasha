import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS03e03 = {
  id: "01a18856-3fff-7fb4-8616-b29b0b3d842d",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s03e03",
  description:
    "Howard and Raj visit a Goth nightclub to pick up women while Sheldon attempts to build a better Penny using chocolate-based behavior modification.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-3"],
  position: 3,
  publishedAt: "2009-10-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64676",
      externalLink: "https://www.themoviedb.org/tv/1418/season/3/episode/3",
    },
  ],
  title: "The Gothowitz Deviation",
  episodeType: "standard",
  stillPath: "/8iWdGkONXwKYsv73HZr6p80Csaa.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
