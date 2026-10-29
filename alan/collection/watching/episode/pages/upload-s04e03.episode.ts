import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS04e03 = {
  id: "01a18859-6799-771e-ba85-c5c96ff360e1",
  type: "page-type/episode",
  slug: "upload-s04e03",
  description:
    "While on their honeymoon, the newlyweds uncover a dark secret. Luke and the AI Gardener head back into the Grey Zone on a rescue mission. Aleesha reveals surprising abilities and Nora and Ingrid share clues.",
  ownLength: 35,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-4"],
  position: 3,
  publishedAt: "2025-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6372215",
      externalLink: "https://www.themoviedb.org/tv/86248/season/4/episode/3",
    },
  ],
  title: "Spa Day",
  episodeType: "standard",
  stillPath: "/dDNMtkuLChWr8NrzRSIyuvRaW7s.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
