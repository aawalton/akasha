import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theBigBangTheoryS03e15 = {
  id: "01a18856-4000-7623-b95a-c753f53ea6bd",
  type: "page-type/episode",
  slug: "the-big-bang-theory-s03e15",
  description:
    "Leonard can only bring one guest on a trip to see CERN's Large Hadron Collider (the world's largest and highest energy particle accelerator) in Switzerland on Valentine's Day.",
  ownLength: 21,
  ownProgress: 0,
  partOfCollections: ["season/the-big-bang-theory-season-3"],
  position: 15,
  publishedAt: "2010-02-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64687",
      externalLink: "https://www.themoviedb.org/tv/1418/season/3/episode/15",
    },
  ],
  title: "The Large Hadron Collision",
  episodeType: "standard",
  stillPath: "/X19dpYs9iBJeiqiqb72STdjCg0.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-29T15:45:16.285Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Episode
