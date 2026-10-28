import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e12 = {
  id: "01a183dc-a492-71b1-b38f-01040c8ff35f",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e12",
  description:
    "The destructive power of Goku and Beerus' fight puts the entire universe in danger.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 12,
  publishedAt: "2015-09-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1110710",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/12",
    },
  ],
  title: "The Universe Will Shatter? Clash! Destroyer vs. Super Saiyan God!",
  episodeType: "standard",
  stillPath: "/9lpPjLqQFIzPyH0s1YFFOdCCRhZ.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
