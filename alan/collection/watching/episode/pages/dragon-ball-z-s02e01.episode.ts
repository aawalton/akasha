import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS02e01 = {
  id: "01a183dc-5613-72e7-aca0-0f1cd9703cb7",
  type: "page-type/episode",
  slug: "dragon-ball-z-s02e01",
  description:
    "Bulma, Gohan, and Krillin are mistaken for friends of Frieza and taken prisoner by an angry army of children! To regain their freedom and continue on their mission, the gang must convince the kids of their innocence.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-2"],
  position: 1,
  publishedAt: "1990-03-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969620",
      externalLink: "https://www.themoviedb.org/tv/12971/season/2/episode/1",
    },
  ],
  title: "Held Captive",
  episodeType: "standard",
  stillPath: "/lo9MBVfz5MPH4n1HzwVnYzSWCgh.jpg",
  voteAverage: 7.5,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
