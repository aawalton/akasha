import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const billieEilishGuessFeaturingBillieEilish = {
  id: "01a0676a-d71f-7033-a307-f5992ebec77d",
  type: "page-type/release",
  slug: "billie-eilish-guess-featuring-billie-eilish",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/billie-eilish"],
  position: 0,
  publishedAt: "2024-08-01",
  grade: "C",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3ThlxfLSy4bfKzxWqmC7VN",
      externalLink: "https://open.spotify.com/album/3ThlxfLSy4bfKzxWqmC7VN",
    },
  ],
  title: "Guess featuring billie eilish",
  createdAt: "2026-09-03T13:17:30.271Z",
  updatedAt: "2026-09-21T19:44:25.000Z",
} as const satisfies Release
