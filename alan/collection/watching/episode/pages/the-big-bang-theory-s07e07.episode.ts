import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS07e07 = {
  id: "01a18856-4005-758a-87ce-a90766e7ba6c",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s07e07",
  description:
    'Sheldon seeks payback when Arthur "Professor Proton" Jeffries asks Leonard for help on a project instead of him. Raj gets upset at Howard for crashing his night with the girls.',
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-7"],
  position: 7,
  publishedAt: "2013-11-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "966295",
      externalLink: "https://www.themoviedb.org/tv/1418/season/7/episode/7",
    },
  ],
  title: "The Proton Displacement",
  episodeType: "standard",
  stillPath: "/j1NUVbJ36CaGqjgFJDi0xR47YON.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
