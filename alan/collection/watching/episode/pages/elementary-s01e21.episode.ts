import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e21 = {
  id: "01a1887e-62a6-76ac-a452-221898042a6e",
  type: "page-type/episode",
  slug: "elementary-s01e21",
  description:
    "Sherlock resumes his hunt for Moriarty when Sebastian Moran reveals that a man who was thought to be dead from a heart attack was actually on the list of intended victims from Moriarty.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 21,
  publishedAt: "2013-05-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64304",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/21",
    },
  ],
  title: "A Landmark Story",
  episodeType: "standard",
  stillPath: "/3IoJKzUdcs6Rx5b7JLaMmgSOcxF.jpg",
  voteAverage: 8.3,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
