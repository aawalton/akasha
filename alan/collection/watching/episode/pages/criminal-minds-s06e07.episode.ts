import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const criminalMindsS06e07 = {
  id: "01a18844-d7ec-7a98-8dc7-825927e4b2ad",
  type: "page-type/episode",
  slug: "criminal-minds-s06e07",
  description:
    "The BAU must catch a group of serial killers that is killing exotic dancers and leaving their bodies in the cornfields of Indiana.",
  ownLength: 42,
  ownProgress: 0,
  partOfCollections: ["season/criminal-minds-season-6"],
  position: 7,
  publishedAt: "2010-11-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "283308",
      externalLink: "https://www.themoviedb.org/tv/4057/season/6/episode/7",
    },
  ],
  title: "Middle Man",
  episodeType: "standard",
  stillPath: "/6GaJisHdQ5DDpyZxGtlrVJBa2uf.jpg",
  voteAverage: 7,
  createdAt: "2026-10-29T15:26:15.527Z",
  updatedAt: "2026-10-29T15:26:15.527Z",
} as const satisfies Episode
