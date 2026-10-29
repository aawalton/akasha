import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const castleS03e18 = {
  id: "01a1887e-1e3f-7e4c-ae17-a2e5e73c64c6",
  type: "page-type/episode",
  slug: "castle-s03e18",
  description:
    'A murder has been committed on the set of "Temptation Lane", one of New York\'s longest running soap operas.',
  ownLength: 44,
  ownProgress: 44,
  partOfCollections: ["season/castle-season-3"],
  position: 18,
  publishedAt: "2011-03-21",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64832",
      externalLink: "https://www.themoviedb.org/tv/1419/season/3/episode/18",
    },
  ],
  title: "One Life to Lose",
  episodeType: "standard",
  stillPath: "/l5xzkjZH3koW0GG0lNHrV3wgg1r.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:28:49.084Z",
  updatedAt: "2026-10-29T16:28:49.084Z",
} as const satisfies Episode
