import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const blueyS01e24 = {
  id: "01a18843-d14e-7c4a-8a18-1a69e720caa6",
  type: "page-type/episode",
  slug: "bluey-s01e24",
  description:
    "Bluey can't wait to get to the monkey bars as Dad takes her and Bingo on a wagon ride to the park. But her patience is tested when Dad keeps stopping to chat with other grown-ups.",
  ownLength: 7,
  ownProgress: 0,
  partOfCollections: ["season/bluey-season-1"],
  position: 24,
  publishedAt: "2018-10-24",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1601150",
      externalLink: "https://www.themoviedb.org/tv/82728/season/1/episode/24",
    },
  ],
  title: "Wagonride",
  episodeType: "standard",
  stillPath: "/9kvwBygFGtRiCugSjZa5U6hmJcO.jpg",
  voteAverage: 8,
  createdAt: "2026-10-29T15:25:08.300Z",
  updatedAt: "2026-10-29T15:25:08.300Z",
} as const satisfies Episode
