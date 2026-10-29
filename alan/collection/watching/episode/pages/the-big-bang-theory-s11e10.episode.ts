import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS11e10 = {
  id: "01a18856-400a-7d3b-bb10-fbd752b92255",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s11e10",
  description:
    "Sheldon and Amy try to eliminate stress from wedding planning by applying math to the process. Also, Raj “breaks up” with Howard after realizing his best friend is actually hurting his confidence.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-11"],
  position: 10,
  publishedAt: "2017-12-07",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1400066",
      externalLink: "https://www.themoviedb.org/tv/1418/season/11/episode/10",
    },
  ],
  title: "The Confidence Erosion",
  episodeType: "standard",
  stillPath: "/661iWFo3pdIjCRN8iqHTF5UPmNe.jpg",
  voteAverage: 6.9,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
