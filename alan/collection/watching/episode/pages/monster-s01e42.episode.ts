import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e42 = {
  id: "01a183d8-0267-70ca-8b55-405d72083534",
  type: "page-type/episode",
  slug: "monster-s01e42",
  description:
    "Grimmer has the key that Petrov gave him, and a former Czechoslovakian secret police organization wants it. Caught and tortured, Grimmer tells his abductors about 'the Magnificent Steiner'.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 42,
  publishedAt: "2005-02-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749559",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/42",
    },
  ],
  title: "The Adventures of the Magnificent Steiner",
  episodeType: "standard",
  stillPath: "/okzyjsp5Lv7UOkhVsKfSlNEoCDi.jpg",
  voteAverage: 8.4,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
