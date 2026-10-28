import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallZSeason7 = {
  id: "01a183dc-5623-7a74-8a3a-071587179b62",
  type: "page-type/season",
  slug: "dragon-ball-z-season-7",
  description:
    "In the seven years since Cell’s defeat, life on Earth has returned to normal. But now, the time has come for a new World Martial Arts Tournament. Goku returns from Other World to challenge Mr. Satan for his title – and to guard against the arrival of a new evil!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-z"],
  position: 7,
  publishedAt: "1993-07-28",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59765",
      externalLink: "https://www.themoviedb.org/tv/12971/season/7",
    },
  ],
  title: "World Tournament Saga",
  posterPath: "/fAEngvnTWOEVMCG13Xbm4hYoW9v.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Season
