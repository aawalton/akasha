import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const monsterS01e23 = {
  id: "01a183d8-0266-7f58-bc0e-29fe9214a195",
  type: "page-type/episode",
  slug: "monster-s01e23",
  description:
    "Eva Heinemann is arrested for public drunkenness and hooks up with Roberto, with whom she was with the night before her arrest. Roberto then reveals his link to Johan and Eva confesses that she was actually a witness the night Junkers was killed by Johan.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/monster-season-1"],
  position: 23,
  publishedAt: "2004-09-08",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "749537",
      externalLink: "https://www.themoviedb.org/tv/30981/season/1/episode/23",
    },
  ],
  title: "Eva's Confession",
  episodeType: "standard",
  stillPath: "/smpyendH3uITqcKHlacuUr9LIbo.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:48:54.116Z",
  updatedAt: "2026-10-28T18:48:54.116Z",
} as const satisfies Episode
