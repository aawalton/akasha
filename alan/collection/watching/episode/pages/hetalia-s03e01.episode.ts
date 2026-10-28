import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const hetaliaS03e01 = {
  id: "01a183d7-7ce2-7474-9ea1-21a2e4e59649",
  type: "page-type/episode",
  slug: "hetalia-s03e01",
  description:
    'Features the story of Prussia, when he was a child as the Teutonic Knights. In other stories: Romano attempts yet again to stop Germany from being with his younger brother, while Canada and America wind up playing a game of "catch" that becomes chaotic.',
  ownLength: 5,
  ownProgress: 0,
  partOfCollections: ["season/hetalia-season-3"],
  position: 1,
  publishedAt: "2010-03-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "797720",
      externalLink: "https://www.themoviedb.org/tv/35138/season/3/episode/1",
    },
  ],
  title: "Diary of The Awesome Me: Volume 128",
  episodeType: "standard",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:48:19.934Z",
  updatedAt: "2026-10-28T18:48:19.934Z",
} as const satisfies Episode
