import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS02e11 = {
  id: "01a18843-d150-7c85-ae2c-2a098c6e947d",
  type: "page-type/episode",
  slug: "bluey-s02e11",
  description:
    "Bluey and Bingo want everyone to play Charades, but Muffin and Socks are too young to understand the rules and Nanna must think quickly to keep the game on track.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-2"],
  position: 11,
  publishedAt: "2020-03-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "2194160",
      externalLink: "https://www.themoviedb.org/tv/82728/season/2/episode/11",
    },
  ],
  title: "Charades",
  episodeType: "standard",
  stillPath: "/mNBDckENRn45e3ooKVBexfpKUJ6.jpg",
  voteAverage: 5.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
