import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisS01e19 = {
  id: "01a1884b-ef63-7dbc-90ab-5da1f228e62b",
  type: "page-type/episode",
  slug: "ncis-s01e19",
  description:
    "An NCIS agent has been murdered while investigating a case and the team's job is to find out what happened.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-season-1"],
  position: 19,
  publishedAt: "2004-04-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "334448",
      externalLink: "https://www.themoviedb.org/tv/4614/season/1/episode/19",
    },
  ],
  title: "Dead Man Talking",
  episodeType: "standard",
  stillPath: "/1P5yH8gAokjhEXXpea0Vzc3Ch7N.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:34:00.289Z",
  updatedAt: "2026-10-29T15:34:00.289Z",
} as const satisfies Episode
