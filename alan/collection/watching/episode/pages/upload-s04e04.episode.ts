import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS04e04 = {
  id: "01a18859-6799-7fb0-a7a6-4dc5f3bfc5f4",
  type: "page-type/episode",
  slug: "upload-s04e04",
  description:
    "The residents of Lakeview race to find justice, revenge and peace as the digital and real worlds collide.",
  ownLength: 46,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-4"],
  position: 4,
  publishedAt: "2025-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6372216",
      externalLink: "https://www.themoviedb.org/tv/86248/season/4/episode/4",
    },
  ],
  title: "Mile End",
  episodeType: "finale",
  stillPath: "/1ejVmRfWFG0bWJTrCZtIH2EyKLu.jpg",
  voteAverage: 6.4,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
