import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS04e01 = {
  id: "01a183dc-5617-7c7f-b19e-4113614f0267",
  type: "page-type/episode",
  slug: "dragon-ball-z-s04e01",
  description:
    "Gohan's going fishing, Krillin's found a girlfriend, and it looks as though peace has once again returned to the Earth. But a terrible evil lurks beneath this tranquil surface: Garlic Junior has escaped from the Dead Zone!",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-4"],
  position: 1,
  publishedAt: "1991-09-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969688",
      externalLink: "https://www.themoviedb.org/tv/12971/season/4/episode/1",
    },
  ],
  title: "The Heavens Tremble",
  episodeType: "standard",
  stillPath: "/kr1T6l4lgDWhvSAIMTBNvVlpc0O.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
