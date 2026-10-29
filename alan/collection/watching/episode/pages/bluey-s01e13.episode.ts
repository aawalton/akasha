import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e13 = {
  id: "01a18843-d14d-7dc2-ad3e-6b8a4043a865",
  type: "page-type/episode",
  slug: "bluey-s01e13",
  description:
    "When Bingo stops playing Bluey's spy game in the park, their device to control the grown-ups stops working properly! Bluey now sees how important Bingo is and needs to win her back!",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 13,
  publishedAt: "2018-10-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593938",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/13",
    },
  ],
  title: "Spy Game",
  episodeType: "standard",
  stillPath: "/4qlxb1AsumuyvHbNbFLR2Onuvl.jpg",
  voteAverage: 6.8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
