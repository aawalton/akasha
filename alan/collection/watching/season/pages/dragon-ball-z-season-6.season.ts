import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallZSeason6 = {
  id: "01a183dc-5623-7179-9868-d1e6204f9711",
  type: "page-type/season",
  slug: "dragon-ball-z-season-6",
  description:
    "Humanity nears extinction as Cell achieves his deadly perfect form! Eager to display his new power, the monster proposes a tournament. If Earth produces a worthy challenger, whether be it Goku or Mr. Satan, mankind will be spared. But if not – death comes to all!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-z"],
  position: 6,
  publishedAt: "1992-11-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59764",
      externalLink: "https://www.themoviedb.org/tv/12971/season/6",
    },
  ],
  title: "Cell Games Saga",
  posterPath: "/st7kFY0s6C5fYsBft5j5XdavKBf.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Season
