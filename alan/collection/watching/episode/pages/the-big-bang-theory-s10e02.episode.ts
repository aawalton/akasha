import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS10e02 = {
  id: "01a18856-4008-799d-8fa7-9ff13f947d37",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s10e02",
  description:
    "Colonel Williams, an Air Force representative from the Department of Material Command sits down to talk with Wolowitz.",
  ownLength: 19,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-10"],
  position: 2,
  publishedAt: "2016-09-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1221932",
      externalLink: "https://www.themoviedb.org/tv/1418/season/10/episode/2",
    },
  ],
  title: "The Military Miniaturization",
  episodeType: "standard",
  stillPath: "/chN747cMwRMuxm1JL1YKsKOsu9O.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
