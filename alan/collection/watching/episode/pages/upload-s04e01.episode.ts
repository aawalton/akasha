import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS04e01 = {
  id: "01a18859-6798-7968-b5e4-88ccdb4b3da1",
  type: "page-type/episode",
  slug: "upload-s04e01",
  description:
    "One Nathan celebrates a bitter-sweet wedding, but things are not what they seem and questions of sanity and religious faith are raised. A lonely AI Guy searches for romance. Aleesha prepares for her new responsibilities while Luke agonizes over their kiss back in Lakeview.",
  ownLength: 38,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-4"],
  position: 1,
  publishedAt: "2025-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6372213",
      externalLink: "https://www.themoviedb.org/tv/86248/season/4/episode/1",
    },
  ],
  title: "Wedding Weekend",
  episodeType: "standard",
  stillPath: "/2ySViv7Fu3zux1Ax8t2BVpWwsVu.jpg",
  voteAverage: 6.6,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
