import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallSuperS01e25 = {
  id: "01a183dc-a494-7df2-a4d6-3209486ca291",
  type: "page-type/episode",
  slug: "dragon-ball-super-s01e25",
  description: "Frieza reveals his new evolution and the battle truly begins.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-super-season-1"],
  position: 25,
  publishedAt: "2015-12-27",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1158814",
      externalLink: "https://www.themoviedb.org/tv/62715/season/1/episode/25",
    },
  ],
  title: "A Full-Throttle Battle! The Vengeful Golden Frieza",
  episodeType: "standard",
  stillPath: "/fsQQCwnR9uvrvX7btNfgkD49UeZ.jpg",
  voteAverage: 9.2,
  createdAt: "2026-10-28T18:53:57.776Z",
  updatedAt: "2026-10-28T18:53:57.776Z",
} as const satisfies Episode
