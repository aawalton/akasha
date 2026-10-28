import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const kOnS01e07 = {
  id: "01a183da-4479-7f7b-adb6-247fa3ad6c28",
  type: "page-type/episode",
  slug: "k-on-s01e07",
  description: "It’s Christmas time and Ritsu decides to hold a Christmas party at Yui’s house.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/k-on-season-1"],
  position: 7,
  publishedAt: "2009-05-15",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "879081",
      externalLink: "https://www.themoviedb.org/tv/42253/season/1/episode/7",
    },
  ],
  title: "Christmas!",
  episodeType: "standard",
  stillPath: "/d0WTXmGiMPaW2ZwFDSERXO073Bs.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:51:22.104Z",
  updatedAt: "2026-10-28T18:51:22.104Z",
} as const satisfies Episode
