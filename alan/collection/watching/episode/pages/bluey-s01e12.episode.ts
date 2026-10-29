import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e12 = {
  id: "01a18843-d14d-75e0-8ce5-eee72495b14e",
  type: "page-type/episode",
  slug: "bluey-s01e12",
  description:
    "When it's Bingo's turn to bring her Kindy's Bob Bilby puppet home and record their weekend in the scrapbook, the family resolve to put down their screens and show him a good time.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 12,
  publishedAt: "2018-10-12",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1593937",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/12",
    },
  ],
  title: "Bob Bilby",
  episodeType: "standard",
  stillPath: "/wsxhWcHZIjqGjpWrkonTaRXe7tj.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
