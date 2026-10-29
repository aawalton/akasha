import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const starWarsRebelsS02e13 = {
  id: "01a18853-ddfd-77ae-b42f-563531107585",
  type: "page-type/episode",
  slug: "star-wars-rebels-s02e13",
  description:
    "While on a mission to obtain fuel for the rebel fleet, the crew works to protect space creatures from the Mining Guild asteroid mining operation that threatens the creatures' lives.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/star-wars-rebels-season-2"],
  position: 13,
  publishedAt: "2016-02-10",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1164926",
      externalLink: "https://www.themoviedb.org/tv/60554/season/2/episode/13",
    },
  ],
  title: "The Call",
  episodeType: "standard",
  stillPath: "/e4gF4n6G5AiygXwZCP2Ey8JIS7z.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-29T15:42:40.123Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Episode
