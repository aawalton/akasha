import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS05e07 = {
  id: "01a18856-986b-7e86-a81a-506457fae974",
  type: "page-type/episode",
  slug: "the-chosen-s05e07",
  description:
    "Jesus arrives at the Last Supper. The disciples fear for their safety as Jesus’ enemies close ranks around them.",
  ownLength: 62,
  ownProgress: 0,
  partOfCollections: ["season/last-supper"],
  position: 7,
  publishedAt: "2025-06-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5992643",
      externalLink: "https://www.themoviedb.org/tv/85077/season/5/episode/7",
    },
  ],
  title: "The Upper Room (1)",
  episodeType: "standard",
  stillPath: "/z6mnUJL8vjMgQe3GgtcuWlLEvx4.jpg",
  voteAverage: 8.6,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
