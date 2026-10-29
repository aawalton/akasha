import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const battlestarGalactica2004Season4 = {
  id: "01a18843-80ec-782e-b0c4-0247487606c5",
  type: "page-type/season",
  slug: "battlestar-galactica-2004-season-4",
  description:
    "As season 4 begins, the last remnants of humanity continue their search for a new home. Galactica’s crew attempts to make sense of the inexplicable while four members of the fleet are still reeling from past revelations.",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/battlestar-galactica-2004"],
  position: 4,
  publishedAt: "2008-04-04",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5843",
      externalLink: "https://www.themoviedb.org/tv/1972/season/4",
    },
  ],
  title: "Battlestar Galactica (2004) Season 4",
  posterPath: "/2RwQPZnISj0KWxhJUVV3mlbKqN4.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-29T15:24:47.718Z",
  updatedAt: "2026-10-29T15:24:47.718Z",
} as const satisfies Season
