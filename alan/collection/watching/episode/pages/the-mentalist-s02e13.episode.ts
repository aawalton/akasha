import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS02e13 = {
  id: "01a18880-75e6-76ef-ac56-209f4716a4ae",
  type: "page-type/episode",
  slug: "the-mentalist-s02e13",
  description:
    "Patrick Jane and the CBI team investigate when the body of a high-end luxury car sales woman is found in the trunk of a Bentley in the dealership's showroom.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-2"],
  position: 13,
  publishedAt: "2010-02-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367725",
      externalLink: "https://www.themoviedb.org/tv/5920/season/2/episode/13",
    },
  ],
  title: "Redline",
  episodeType: "standard",
  stillPath: "/uVoVkRaabooBN0EfaiQttVdsei1.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
