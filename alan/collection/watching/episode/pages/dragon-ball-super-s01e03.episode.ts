import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e03 = {
  id: "01a183dc-a490-7098-a4d8-2c2de9af05d9",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e03",
  description:
    "Beerus and Whis track down the Super Saiyan God. Meanwhile, Bulma and her friends set up her birthday party.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 3,
  publishedAt: "2015-07-19",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1087021",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/3",
    },
  ],
  title: "Where Does the Dream Pick Up? Find the Super Saiyan God!",
  episodeType: "standard",
  stillPath: "/i2XklGnEBERZ3JPV3219vCPhjRT.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
