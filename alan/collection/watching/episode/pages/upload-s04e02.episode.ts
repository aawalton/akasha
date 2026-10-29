import type { Episode } from "akasha/alan/collection/watching/episode/episode.page-type.types.ts"

export const uploadS04e02 = {
  id: "01a18859-6799-7ecc-8ad5-e3dd080883e5",
  type: "page-type/episode",
  slug: "upload-s04e02",
  description:
    "The bride and groom save up for their honeymoon. Horizen-Betta debuts a new, money-making technology. Luke tries to enjoy his job at Workload, and the AI Elevator Operator splits off an AI Girl and falls head over heels.",
  ownLength: 32,
  ownProgress: 0,
  partOfCollections: ["season/upload-season-4"],
  position: 2,
  publishedAt: "2025-08-25",
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "tmdb",
      externalId: "6372214",
      externalLink: "https://www.themoviedb.org/tv/86248/season/4/episode/2",
    },
  ],
  title: "Workload",
  episodeType: "standard",
  stillPath: "/rF6nyQa85ay2OLs2F1BZSGPXUqg.jpg",
  voteAverage: 6.2,
  createdAt: "2026-10-29T15:48:43.031Z",
  updatedAt: "2026-10-29T15:48:43.031Z",
} as const satisfies Episode
