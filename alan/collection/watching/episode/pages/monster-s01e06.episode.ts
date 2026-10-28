import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e06 = {
  id: "01a183d8-0265-71af-8060-cdad5e77f1bc",
  type: "page-type/episode",
  slug: "monster-s01e06",
  description:
    "Nina finally receives an email informing her to meet the anonymous sender at a specified time and place. Dr. Tenma in his search for the Liebert girl, asks Mauler, an editor for a local publisher, for assistance in his investigations.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 6,
  publishedAt: "2004-05-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749520",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/6",
    },
  ],
  title: "The Missing",
  episodeType: "standard",
  stillPath: "/tLso0ODwU9bAUFIPdAvCUSvlelI.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
