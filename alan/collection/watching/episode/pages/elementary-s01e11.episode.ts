import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const elementaryS01e11 = {
  id: "01a1887e-62a6-7e18-89ca-034c8e64b938",
  type: "page-type/episode",
  slug: "elementary-s01e11",
  description:
    "Sherlock and Joan investigate the murder of the general manager of a high-end Manhattan hotel whose body is found inside an industrial laundry machine. Meanwhile, since Joan’s time with Sherlock is almost up, he offers her an apprenticeship.",
  ownLength: 43,
  ownProgress: 43,
  partOfCollections: ["season/elementary-season-1"],
  position: 11,
  publishedAt: "2013-01-03",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "64295",
      externalLink: "https://www.themoviedb.org/tv/1415/season/1/episode/11",
    },
  ],
  title: "Dirty Laundry",
  episodeType: "standard",
  stillPath: "/gLyxzCfSlPgDAJGMKA2JYRmUeHT.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-29T16:29:06.597Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Episode
