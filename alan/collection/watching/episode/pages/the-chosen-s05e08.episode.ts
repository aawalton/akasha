import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS05e08 = {
  id: "01a18856-986b-702c-8b86-325af903ffb7",
  type: "page-type/episode",
  slug: "the-chosen-s05e08",
  description:
    "Pilate summons Atticus to read him the riot act. The Sanhedrin boils over. The Last Supper ends.",
  ownLength: 66,
  ownProgress: 0,
  partOfCollections: ["season/last-supper"],
  position: 8,
  publishedAt: "2025-06-29",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "5992644",
      externalLink: "https://www.themoviedb.org/tv/85077/season/5/episode/8",
    },
  ],
  title: "The Upper Room (2)",
  episodeType: "finale",
  stillPath: "/lafv8JbwffijVKk9twFcp4tI5Wb.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
