import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e09 = {
  id: "01a183d8-0265-7f54-84b7-ecaadbdab36f",
  type: "page-type/episode",
  slug: "monster-s01e09",
  description:
    "An old mercenary soldier named Hugo is interrogated by Lunge about a student of his, a doctor named Tenma.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 9,
  publishedAt: "2004-06-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749523",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/9",
    },
  ],
  title: "The Girl and the Seasoned Soldier",
  episodeType: "standard",
  stillPath: "/96WWv4x4wTlhJfpmY1KKkj3LQCt.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
