import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const ncisNewOrleansS05e22 = {
  id: "01a1884b-301c-7ad8-88fd-8dc46eb0f2b1",
  type: "page-type/episode",
  slug: "ncis-new-orleans-s05e22",
  description:
    "The NCIS team investigates a deadly bombing at a military museum event with over 1,000 people in attendance.",
  ownLength: 45,
  ownProgress: 0,
  partOfCollections: ["season/ncis-new-orleans-season-5"],
  position: 22,
  publishedAt: "2019-04-30",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1776826",
      externalLink: "https://www.themoviedb.org/tv/61387/season/5/episode/22",
    },
  ],
  title: "Chaos Theory",
  episodeType: "standard",
  stillPath: "/nESDMGBgSV16sVoKRpI6N3X1brq.jpg",
  voteAverage: 8.5,
  createdAt: "2026-10-29T15:33:11.316Z",
  updatedAt: "2026-10-29T15:33:11.316Z",
} as const satisfies Episode
