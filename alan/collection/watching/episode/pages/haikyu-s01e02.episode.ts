import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const haikyuS01e02 = {
  id: "01a183d2-cc45-733d-8521-b886fe9e71f4",
  type: "page-type/episode",
  slug: "haikyu-s01e02",
  description:
    'Before starting high school, Hinata had sworn revenge against Kageyama of Kitagawa Daiichi. But strangely enough he encounters the "king of the court" again, but this time in the gym of Karasuno High School. Their head-butting is unrelenting and they start their own match, but the third-year captain Sawamura disallows them from participating in the volleyball club until they learn to show team spirit. What now?',
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/haikyu-season-1"],
  position: 2,
  publishedAt: "2014-04-13",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "986239",
      externalLink: "https://www.themoviedb.org/tv/60863/season/1/episode/2",
    },
  ],
  title: "Karasuno High School Volleyball Club",
  episodeType: "standard",
  stillPath: "/8UWM0NV1Bw8sp2YIsrDUGehAeUv.jpg",
  voteAverage: 7.6,
  createdAt: "2026-10-28T18:43:12.581Z",
  updatedAt: "2026-10-28T18:43:12.581Z",
} as const satisfies Episode
