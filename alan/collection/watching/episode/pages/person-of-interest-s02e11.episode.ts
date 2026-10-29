import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const personOfInterestS02e11 = {
  id: "01a18851-3df4-7d0a-aa16-0dd72b7e7b3a",
  type: "page-type/episode",
  slug: "person-of-interest-s02e11",
  description:
    "Finch goes under cover to protect a youth who reminds him of himself; Carter goes on a dangerous mission for the FBI.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/person-of-interest-season-2"],
  position: 11,
  publishedAt: "2013-01-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64089",
      externalLink: "https://www.themoviedb.org/tv/1411/season/2/episode/11",
    },
  ],
  title: "2πR",
  episodeType: "standard",
  stillPath: "/j7KOyXo6Ldrorag4Cp5yWcRNIHz.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:39:48.082Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Episode
