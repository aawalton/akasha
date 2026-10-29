import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS02e01 = {
  id: "01a18880-75e6-775c-8eee-f6a7b871acaf",
  type: "page-type/episode",
  slug: "the-mentalist-s02e01",
  description:
    "Jane and Lisbon learn that the Red John case has been reassigned to a different CBI team led by the straight-shooting officer Sam Bosco.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-2"],
  position: 1,
  publishedAt: "2009-09-24",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367714",
      externalLink: "https://www.themoviedb.org/tv/5920/season/2/episode/1",
    },
  ],
  title: "Redemption",
  episodeType: "standard",
  stillPath: "/cHnMZCdgxSVAGCi1JtlsJadeahH.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
