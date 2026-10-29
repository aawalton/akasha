import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const stevenUniverseS05e14 = {
  id: "01a18855-67ec-70ce-b9f8-fc0b03711b91",
  type: "page-type/episode",
  slug: "steven-universe-s05e14",
  description:
    "Steven shoots a documentary that follows a local band as they get their first big break.",
  ownLength: 12,
  ownProgress: 0,
  partOfCollections: ["season/steven-universe-season-5"],
  position: 14,
  publishedAt: "2018-04-16",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1478874",
      externalLink: "https://www.themoviedb.org/tv/61175/season/5/episode/14",
    },
  ],
  title: "The Big Show",
  episodeType: "standard",
  stillPath: "/eyWktVsfjBngjQHkNdONAaZ5t5T.jpg",
  voteAverage: 7.2,
  createdAt: "2026-10-29T15:44:20.963Z",
  updatedAt: "2026-10-29T15:44:20.963Z",
} as const satisfies Episode
