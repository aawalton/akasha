import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e02 = {
  id: "01a183dc-a490-725a-9c74-1479c1ee7b13",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e02",
  description:
    "Vegeta and his family go on a family trip while Goku trains. Beerus remembers the Super Saiyan God in his dream.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 2,
  publishedAt: "2015-07-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1083991",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/2",
    },
  ],
  title: "To the Promised Resort! Vegeta Takes a Family Trip?!",
  episodeType: "standard",
  stillPath: "/6D19DLwM0PG1ECTnWvItyYu1DVV.jpg",
  voteAverage: 8.8,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
