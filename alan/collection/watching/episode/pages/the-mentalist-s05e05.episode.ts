import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS05e05 = {
  id: "01a18880-75ea-71ee-a30c-47c1bb35d0f7",
  type: "page-type/episode",
  slug: "the-mentalist-s05e05",
  description: "See how Jane met Lisbon and the rest of the CBI team for the first time.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-5"],
  position: 5,
  publishedAt: "2012-10-28",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367792",
      externalLink: "https://www.themoviedb.org/tv/5920/season/5/episode/5",
    },
  ],
  title: "Red Dawn",
  episodeType: "standard",
  stillPath: "/7Er2lXBf6aISRPtoPdOuWibBvgZ.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
