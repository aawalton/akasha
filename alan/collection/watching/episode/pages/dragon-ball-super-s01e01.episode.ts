import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e01 = {
  id: "01a183dc-a490-7c45-bf54-fa2735a27289",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e01",
  description:
    "Goku is farming with Goten when Mr. Satan tries to give him 100 Million Zeni! Goten and Trunks try to find a gift to Videl.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 1,
  publishedAt: "2015-07-05",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1063301",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/1",
    },
  ],
  title: "A Peacetime Reward; Who Gets the 100,000,000 Zeni?!",
  episodeType: "standard",
  stillPath: "/mQwqbaoxaEJdi5xNMnWpt02Y6Bd.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
