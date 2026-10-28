import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const dragonBallZSeason2 = {
  id: "01a183dc-5623-7c98-ac9c-819140e184b8",
  type: "page-type/season",
  slug: "dragon-ball-z-season-2",
  description:
    "While Goku recovers from injuries suffered during battle with the Saiyans, his friends begin their perilous quest for the Namekian Dragon Balls. Awaiting their arrival on Planet Namek is the powerful Ginyu Force – and the vile monster Frieza!",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["show/dragon-ball-z"],
  position: 2,
  publishedAt: "1990-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "59760",
      externalLink: "https://www.themoviedb.org/tv/12971/season/2",
    },
  ],
  title: "Namek Saga",
  posterPath: "/nFI492Jd9cMvG5Y0wfAHbe0lpXk.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Season
