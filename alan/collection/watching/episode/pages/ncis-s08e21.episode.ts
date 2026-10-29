import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS08e21 = {
  id: "01a1884b-ef6d-76c2-b53b-5a6a587c66ed",
  type: "page-type/episode",
  slug: "ncis-s08e21",
  description:
    "The NCIS team tracks a Navy Lieutenant's killer after a Pentagon security camera reveals a Petty Officer committing the crime.",
  ownLength: 43,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-8"],
  position: 21,
  publishedAt: "2011-04-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334588",
      externalLink: "https://www.themoviedb.org/tv/4614/season/8/episode/21",
    },
  ],
  title: "Dead Reflection",
  episodeType: "standard",
  stillPath: "/zh4KyzPud61rEJ0fGsmvTOiAmsr.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
