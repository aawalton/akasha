import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e11 = {
  id: "01a183d3-f46d-77b8-8e10-893d15d8d4b3",
  type: "page-type/episode",
  slug: "bleach-s01e11",
  description: "Ichigo Kurosaki and Rukia Kuchiki meet Uryū Ishida, a Quincy.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 11,
  publishedAt: "2004-12-14",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750581",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/11",
    },
  ],
  title: "The Legendary Quincy",
  episodeType: "standard",
  stillPath: "/7YXdkWz5KaQKdJcWK61PvZ3ssJa.jpg",
  voteAverage: 7.9,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
