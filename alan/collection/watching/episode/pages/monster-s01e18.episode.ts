import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e18 = {
  id: "01a183d8-0266-76f9-a345-60c530be2558",
  type: "page-type/episode",
  slug: "monster-s01e18",
  description:
    "Nina meets with an old friend and boss, Mister Rosso. The delightful old boss however, has a very dark past.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 18,
  publishedAt: "2004-08-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749533",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/18",
    },
  ],
  title: "Five Sugars",
  episodeType: "standard",
  stillPath: "/vujsVa6Pl2eRnYbqL6gwpOkENxQ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
