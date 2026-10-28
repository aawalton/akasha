import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const fairyTailS01e01 = {
  id: "01a183d7-264e-7403-a282-81eafb6432a0",
  type: "page-type/episode",
  slug: "fairy-tail-s01e01",
  description:
    "Lucy wants nothing more than to join Fairy  Tail, the most rambunctious wizard’s guild in Fiore. When a phony lures  her onto his ship with the promise of getting into the guild of her  dreams, her newest friends arrive to bail her out!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/fairy-tail-season-1"],
  position: 1,
  publishedAt: "2009-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "908294",
      externalLink: "https://www.themoviedb.org/tv/46261/season/1/episode/1",
    },
  ],
  title: "The Fairy Tail",
  episodeType: "standard",
  stillPath: "/nnd6BNJmJvOhjrNbXIrUSOdKTqi.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:47:57.774Z",
  updatedAt: "2026-10-28T18:47:57.774Z",
} as const satisfies Episode
