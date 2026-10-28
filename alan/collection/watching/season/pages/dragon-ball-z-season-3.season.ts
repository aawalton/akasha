import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallZSeason3 = {
  id: "01a183dc-5623-7a7a-9da7-cfcc6e692620",
  type: "page-type/season",
  slug: "dragon-ball-z-season-3",
  description:
    "All seven Namekian Dragon Balls have been assembled, and the dragon Porunga has been summoned. Goku and his loyal friends must stop Frieza from making his wish for immortality. To defeat this monstrous foe – a Super Saiyan must emerge!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-z"],
  position: 3,
  publishedAt: "1991-01-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59761",
      externalLink: "https://www.themoviedb.org/tv/12971/season/3",
    },
  ],
  title: "Frieza Saga",
  posterPath: "/qrpK9feifrOiUP0H0XJvXmW1fJq.jpg",
  voteAverage: 8.2,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Season
