import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS02e04 = {
  id: "01a18856-3ffe-7df8-9025-8a913e4235ed",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s02e04",
  description:
    "Raj gets an inflated ego and makes a play for Penny after being referenced in a magazine article.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-2"],
  position: 4,
  publishedAt: "2008-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64654",
      externalLink: "https://www.themoviedb.org/tv/1418/season/2/episode/4",
    },
  ],
  title: "The Griffin Equivalency",
  episodeType: "standard",
  stillPath: "/AvCiGNJqqaowpZlBdoO6Bp2hIdp.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
