import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e15 = {
  id: "01a183d3-f46f-7ab6-8ff5-7b179bbcd0c0",
  type: "page-type/episode",
  slug: "bleach-s01e15",
  description:
    "Kon decides to run away from the Kurosaki Clinic as Soul Society comes after Rukia Kuchiki.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 15,
  publishedAt: "2005-01-18",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750564",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/15",
    },
  ],
  title: "Kon's Great Plan",
  episodeType: "standard",
  stillPath: "/o1vumNWdM9NgNaiSsQwt5DlcYSE.jpg",
  voteAverage: 7.7,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
