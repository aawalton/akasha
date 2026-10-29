import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const babylon5S01e02 = {
  id: "01a18843-507e-7b6d-bdb7-63e58d2693b9",
  type: "page-type/episode",
  slug: "babylon-5-s01e02",
  description:
    "A badly damaged ship is brought into the station and the strange alien inside is identified as a soul hunter - an immortal race who can sense death and supposedly steal someone's soul.",
  ownLength: 44,
  ownProgress: 0,
  partOfCollections: ["season/babylon-5-signs-and-portents"],
  position: 2,
  publishedAt: "1994-02-02",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "235788",
      externalLink: "https://www.themoviedb.org/tv/3137/season/1/episode/2",
    },
  ],
  title: "Soul Hunter",
  episodeType: "standard",
  stillPath: "/fzRscXqLk03F78zc75AU3oYn2YH.jpg",
  voteAverage: 7.1,
  createdAt: "2026-10-29T15:24:35.325Z",
  updatedAt: "2026-10-29T15:24:35.325Z",
} as const satisfies Episode
