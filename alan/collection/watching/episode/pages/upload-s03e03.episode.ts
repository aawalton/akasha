import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS03e03 = {
  id: "01a18859-6798-7451-af27-c49e820c1804",
  type: "page-type/episode",
  slug: "upload-s03e03",
  description:
    "The gang celebrates CyberDiscountDay while Nora discovers something game-changing: Nathan has been copied in Lakeview.",
  ownLength: 33,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-3"],
  position: 3,
  publishedAt: "2023-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "4670013",
      externalLink: "https://www.themoviedb.org/tv/86248/season/3/episode/3",
    },
  ],
  title: "CyberDiscountDay",
  episodeType: "standard",
  stillPath: "/gmWFHoyAuYtfGYPLIcvyD58wa7q.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
