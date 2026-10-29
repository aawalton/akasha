import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS03e02 = {
  id: "01a18880-75e7-7213-90ab-401c34745949",
  type: "page-type/episode",
  slug: "the-mentalist-s03e02",
  description:
    "When Jane's brother-in-law returns to town and gets mixed up in a murder investigation, Jane must come to his aid despite personal reservations.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-3"],
  position: 2,
  publishedAt: "2010-09-30",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367739",
      externalLink: "https://www.themoviedb.org/tv/5920/season/3/episode/2",
    },
  ],
  title: "Cackle-Bladder Blood",
  episodeType: "standard",
  stillPath: "/te3Yhs2Yyso2N42Py1nzdSBNAIC.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
