import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS06e03 = {
  id: "01a18880-75eb-7a39-a36a-7975fe3799d9",
  type: "page-type/episode",
  slug: "the-mentalist-s06e03",
  description:
    "Jane gets the CBI involved in a case in Napa in order to focus on Sheriff McAllister, while Van Pelt and Rigsby take a trip down the aisle.",
  ownLength: 42,
  ownProgress: 42,
  partOfCollections: ["season/the-mentalist-season-6"],
  position: 3,
  publishedAt: "2013-10-13",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367811",
      externalLink: "https://www.themoviedb.org/tv/5920/season/6/episode/3",
    },
  ],
  title: "Wedding in Red",
  episodeType: "standard",
  stillPath: "/2H33JIkcdPaaxGrjwG3fFSfYiNr.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
