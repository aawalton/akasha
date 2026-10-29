import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS10e10 = {
  id: "01a18856-4009-7d11-a49a-0e90900b3933",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s10e10",
  description:
    "Sheldon and Leonard try to divvy up their shared belongings, but can’t agree on anything. Also, Koothrappali and Stuart fight to be the most helpful during Bernadette’s final weeks of pregnancy.",
  ownLength: 20,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-10"],
  position: 10,
  publishedAt: "2016-12-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1242471",
      externalLink: "https://www.themoviedb.org/tv/1418/season/10/episode/10",
    },
  ],
  title: "The Property Division Collision",
  episodeType: "standard",
  stillPath: "/gdmbxOWVmc35uryPjQdGeIFYhbU.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
