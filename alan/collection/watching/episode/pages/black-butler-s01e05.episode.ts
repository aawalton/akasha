import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blackButlerS01e05 = {
  id: "01a183d8-99a5-760e-9739-cdcb933c245a",
  type: "page-type/episode",
  slug: "black-butler-s01e05",
  description:
    "The Butler and his Young Master scour the seedy back alleys of London in search of an infamous butcher. Imagine their surprise upon discovering that the ripper may actually be a reaper!",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/black-butler-season-1"],
  position: 5,
  publishedAt: "2008-10-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "919021",
      externalLink: "https://www.themoviedb.org/tv/50712/season/1/episode/5",
    },
  ],
  title: "His Butler, Chance Encounter",
  episodeType: "standard",
  stillPath: "/2NKd68EUVC7h4zaXS5J10iXzfJs.jpg",
  voteAverage: 7.3,
  createdAt: "2026-10-28T18:49:32.837Z",
  updatedAt: "2026-10-28T18:49:32.837Z",
} as const satisfies Episode
