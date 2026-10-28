import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e16 = {
  id: "01a183d8-0265-70be-920b-c9545122cc08",
  type: "page-type/episode",
  slug: "monster-s01e16",
  description:
    "Nina escapes the mansion. And Tenma meets with the unrecognizable General Wolf at the mansion later.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 16,
  publishedAt: "2004-07-21",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749529",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/16",
    },
  ],
  title: "Wolf's Confession",
  episodeType: "standard",
  stillPath: "/5VjzqfvUbnjHmrfLY9KtUUFRO7M.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
