import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theMentalistS02e15 = {
  id: "01a18880-75e6-7546-b906-7003c193cbc8",
  type: "page-type/episode",
  slug: "the-mentalist-s02e15",
  description:
    "Jane and the team investigate the murder of an arrogant chef during a cooking competition in Napa Valley.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/the-mentalist-season-2"],
  position: 15,
  publishedAt: "2010-03-04",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "367727",
      externalLink: "https://www.themoviedb.org/tv/5920/season/2/episode/15",
    },
  ],
  title: "Red Herring",
  episodeType: "standard",
  stillPath: "/hizPsbcTDOfmhQlDYKjnXOuoPBW.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T16:31:22.596Z",
  updatedAt: "2026-10-29T16:31:22.596Z",
} as const satisfies Episode
