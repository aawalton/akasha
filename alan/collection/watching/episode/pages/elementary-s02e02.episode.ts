import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS02e02 = {
  id: "01a1887e-62a7-7030-b851-6d92cd29b002",
  type: "page-type/episode",
  slug: "elementary-s02e02",
  description:
    "When a well-respected mathematician is found dead, Holmes and Watson set out to solve a murder and the purpose of the highly guarded equation he was trying to decipher. Meanwhile, Watson is conflicted when the son of a former patient approaches her for a loan.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-2"],
  position: 2,
  publishedAt: "2013-10-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64311",
      externalLink: "https://www.themoviedb.org/tv/1415/season/2/episode/2",
    },
  ],
  title: "Solve for X",
  episodeType: "standard",
  stillPath: "/5YCoyjhDQ8utALZmJbcwOjVHnjI.jpg",
  voteAverage: 7.8,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
