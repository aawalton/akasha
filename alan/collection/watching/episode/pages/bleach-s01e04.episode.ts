import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const bleachS01e04 = {
  id: "01a183d3-f46c-73b5-9f2f-5d098bc2773a",
  type: "page-type/episode",
  slug: "bleach-s01e04",
  description:
    "When Yasutora Sado receives a parakeet that contains the Soul of a young boy, it is up to Ichigo Kurosaki and Rukia Kuchiki to protect him from the Hollow that is after them.",
  ownLength: 23,
  ownProgress: 0,
  partOfCollections: ["season/bleach-season-1"],
  position: 4,
  publishedAt: "2004-10-26",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "750576",
      externalLink: "https://www.themoviedb.org/tv/30984/season/1/episode/4",
    },
  ],
  title: "Cursed Parakeet",
  episodeType: "standard",
  stillPath: "/LiDwVUfIgH5ZRPCPNFITrI48HW.jpg",
  voteAverage: 8,
  createdAt: "2026-10-28T18:44:28.395Z",
  updatedAt: "2026-10-28T18:44:28.395Z",
} as const satisfies Episode
