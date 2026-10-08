import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const mitskiGlideCover = {
  id: "01a0676a-d71f-7003-8b7e-6399dd1ad383",
  type: "page-type/release",
  slug: "mitski-glide-cover",
  title: "Glide (cover)",
  partOfCollections: ["artist/mitski"],
  position: 0,
  ownLength: 3.686533,
  ownProgress: 3.686533,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2021-07-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7ocua9hYnh95mgXEibBKmc",
      externalLink: "https://open.spotify.com/album/7ocua9hYnh95mgXEibBKmc",
    },
  ],
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
