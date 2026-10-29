import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS02e05 = {
  id: "01a18856-3ffe-73a4-99ae-6de735550da4",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s02e05",
  description:
    "Leonard and his friends stage an intervention to force Sheldon to face his fear of driving.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-2"],
  position: 5,
  publishedAt: "2008-10-20",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64655",
      externalLink: "https://www.themoviedb.org/tv/1418/season/2/episode/5",
    },
  ],
  title: "The Euclid Alternative",
  episodeType: "standard",
  stillPath: "/84UnqiLl4J8LCmJXWwTNfne4pWC.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
