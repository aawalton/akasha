import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const pandemicS01e02 = {
  id: "01a18850-48f3-78d9-b3aa-c56d33a8602e",
  type: "page-type/episode",
  slug: "pandemic-s01e02",
  description:
    "An epidemiologist and an FBI agent try to stop a deadly virus that spreads from person to person in Los Angeles",
  ownLength: 68,
  ownProgress: 0,
  partOfCollections: ["season/pandemic-season-1"],
  position: 2,
  publishedAt: "2007-05-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1446870",
      externalLink: "https://www.themoviedb.org/tv/41322/season/1/episode/2",
    },
  ],
  title: "Part 2",
  episodeType: "standard",
  voteAverage: 7,
  createdAt: "2026-10-29T15:38:45.363Z",
  updatedAt: "2026-10-29T15:38:45.363Z",
} as const satisfies Episode
