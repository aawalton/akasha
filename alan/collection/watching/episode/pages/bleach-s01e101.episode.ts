import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e101 = {
  id: "01a183d3-f46c-7b95-9487-8627453f1d13",
  type: "page-type/episode",
  slug: "bleach-s01e101",
  description:
    "Captain Mayuri Kurotsuchi, of the 12th Division, battles against the Bount, Sawatari.",
  ownLength: 24,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 101,
  publishedAt: "2006-11-01",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "1517234",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/101",
    },
  ],
  title: "Mayuri's Bankai!! Sawatari: Clash of the Demon",
  episodeType: "standard",
  stillPath: "/drLeoE2RBdg5K3ibl7byuWX3Xch.jpg",
  voteAverage: 7.4,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
