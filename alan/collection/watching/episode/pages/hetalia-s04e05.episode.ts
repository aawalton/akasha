import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS04e05 = {
  id: "01a183d7-7ce5-7d48-a22f-49e9e2daf793",
  type: "page-type/episode",
  slug: "hetalia-s04e05",
  description: "After meeting France, a Parisian mortal ponders what it means to live forever.",
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-4"],
  position: 5,
  publishedAt: "2013-02-22",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1826969",
      externalLink: "https://www.themoviedb.org/tv/35138/season/4/episode/5",
    },
  ],
  title: "Though I May Depart, You Shall Remain",
  episodeType: "standard",
  voteAverage: 0,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
