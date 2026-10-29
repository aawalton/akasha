import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const studioCS16e06 = {
  id: "01a18855-c29f-7d99-9de0-94f1540304a4",
  type: "page-type/episode",
  slug: "studio-c-s16e06",
  description:
    "Mall Lincoln teaches the true meaning of President’s Day. Garet takes a call while getting mugged.",
  ownLength: 25,
  ownProgress: 0,
  partOfCollections: ["season/studio-c-season-16"],
  position: 6,
  publishedAt: "2022-11-06",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4839039",
      externalLink: "https://www.themoviedb.org/tv/68207/season/16/episode/6",
    },
  ],
  title: "Mall Presidents at the Mall",
  episodeType: "standard",
  stillPath: "/xsXRAUS5A6ulQpNiBQGViFI7cIj.jpg",
  voteAverage: 0,
  createdAt: "2026-10-29T15:44:44.188Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Episode
