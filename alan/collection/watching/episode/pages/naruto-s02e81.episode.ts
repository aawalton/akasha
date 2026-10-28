import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const narutoS02e81 = {
  id: "01a183d1-bb50-7641-b299-54bd0bffc241",
  type: "page-type/episode",
  slug: "naruto-s02e81",
  description:
    "Two mysterious ninja infiltrate Konoha, and one of them bares the Sharingan. Just what are these two after? Why has Itachi Uchiha returned to Konoha?",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/naruto-season-2"],
  position: 81,
  publishedAt: "2004-04-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "960133",
      externalLink: "https://www.themoviedb.org/tv/46260/season/2/episode/81",
    },
  ],
  title: "Return of the Morning Mist",
  episodeType: "standard",
  stillPath: "/9NKIZlWflgl93alhzEjafXtkB3V.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-28T18:42:02.697Z",
  updatedAt: "2026-10-28T18:42:02.697Z",
} as const satisfies Episode
