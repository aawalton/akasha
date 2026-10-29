import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS03e19 = {
  id: "01a18856-4000-7b29-8c22-0e5647878521",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s03e19",
  description:
    "A fight between Leonard and Penny threatens their relationship, while Sheldon battles Wil Wheaton in bowling.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-3"],
  position: 19,
  publishedAt: "2010-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64688",
      externalLink: "https://www.themoviedb.org/tv/1418/season/3/episode/19",
    },
  ],
  title: "The Wheaton Recurrence",
  episodeType: "standard",
  stillPath: "/oHlOeHU6ruNOCE2yvRYG21r0AB5.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
