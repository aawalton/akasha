import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e08 = {
  id: "01a183d8-0265-799b-969d-ff993a8813f1",
  type: "page-type/episode",
  slug: "monster-s01e08",
  description:
    "Eva tries to threaten Dr. Tenma, unless he gets back with her, she would reveal to the police that the tie that was found at the scene of the crime is his!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 8,
  publishedAt: "2004-05-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749522",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/8",
    },
  ],
  title: "Pursued",
  episodeType: "standard",
  stillPath: "/wlMYF7b88FPoCvjVnNqKPixF5Ha.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
