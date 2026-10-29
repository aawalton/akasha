import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const theChosenS01e07 = {
  id: "01a18856-9869-7c06-887c-ad10129dfda0",
  type: "page-type/episode",
  slug: "the-chosen-s01e07",
  description:
    "Matthew struggles to reconcile the miracles he has witnessed with reality. Nicodemus meets with Jesus by night.",
  ownLength: 36,
  ownProgress: 0,
  partOfCollections: ["season/the-chosen-season-1"],
  position: 7,
  publishedAt: "2019-11-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1988465",
      externalLink: "https://www.themoviedb.org/tv/85077/season/1/episode/7",
    },
  ],
  title: "Invitations",
  episodeType: "standard",
  stillPath: "/endRXmg12QtiuoB4O70LzZLXNMi.jpg",
  voteAverage: 8.9,
  createdAt: "2026-10-29T15:45:38.921Z",
  updatedAt: "2026-10-29T15:45:38.921Z",
} as const satisfies Episode
