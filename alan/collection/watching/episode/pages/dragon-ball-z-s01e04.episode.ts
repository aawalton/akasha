import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const dragonBallZS01e04 = {
  id: "01a183dc-5610-7f9b-8d46-2fb113ff5aa1",
  type: "page-type/episode",
  slug: "dragon-ball-z-s01e04",
  description:
    "Piccolo may have a way to stop Raditz - the Makankosappo! There’s only one problem. He needs time to gather energy for the blast, which means Goku must fight Raditz alone!",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/dragon-ball-z-season-1"],
  position: 4,
  publishedAt: "1989-05-17",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "969584",
      externalLink: "https://www.themoviedb.org/tv/12971/season/1/episode/4",
    },
  ],
  title: "Piccolo's Plan",
  episodeType: "standard",
  stillPath: "/70h09WjqCHwijBtMNR3wdk6ad7l.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-28T18:53:37.679Z",
  updatedAt: "2026-10-28T18:53:37.679Z",
} as const satisfies Episode
