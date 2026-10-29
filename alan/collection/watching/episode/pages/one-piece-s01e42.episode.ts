import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const onePieceS01e42 = {
  id: "01a18884-52e6-74c9-b001-6643e7beeebb",
  type: "page-type/episode",
  slug: "one-piece-s01e42",
  description: "Luffy returns to the fight, and the battle with Arlong versus Luffy begins.",
  ownLength: 25,
  ownProgress: 25,
  partOfCollections: ["season/one-piece-season-1"],
  position: 42,
  publishedAt: "2000-09-27",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1153013",
      externalLink: "https://www.themoviedb.org/tv/37854/season/1/episode/42",
    },
  ],
  title: "Explosion! Fishman Arlong's Fierce Assault From the Sea!",
  episodeType: "standard",
  stillPath: "/pDz4ikUgf6v0ZDT83DfDTRWUbzb.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:35:35.779Z",
  updatedAt: "2026-10-29T16:35:35.779Z",
} as const satisfies Episode
