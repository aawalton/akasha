import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS04e07 = {
  id: "01a18856-986b-7af2-b5d5-40522902d057",
  type: "page-type/episode",
  slug: "the-chosen-s04e07",
  description:
    "Jesus brings Lazarus back to life—and sets off the chain of events that will lead to His own death.",
  ownLength: 74,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-4"],
  position: 7,
  publishedAt: "2024-06-23",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4828951",
      externalLink: "https://www.themoviedb.org/tv/85077/season/4/episode/7",
    },
  ],
  title: "The Last Sign",
  episodeType: "standard",
  stillPath: "/hj6EAD9qfrLxsUB3LKwGqVI2Eph.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
