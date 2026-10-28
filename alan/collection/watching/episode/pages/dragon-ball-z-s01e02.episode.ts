import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS01e02 = {
  id: "01a183dc-560f-7ae9-beb8-d47e4b662769",
  type: "page-type/episode",
  slug: "dragon-ball-z-s01e02",
  description:
    "Goku and Gohan attend a reunion on Roshi’s island, where Goku introduces his son to all of his old friends. The smiles quickly fade, however, as an unexpected visitor - Raditz - lands on the island.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-1"],
  position: 2,
  publishedAt: "1989-05-03",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969582",
      externalLink: "https://www.themoviedb.org/tv/12971/season/1/episode/2",
    },
  ],
  title: "Reunions",
  episodeType: "standard",
  stillPath: "/mFYFlJfxBlirEtZOXUr9naU1wMF.jpg",
  voteAverage: 8.1,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
