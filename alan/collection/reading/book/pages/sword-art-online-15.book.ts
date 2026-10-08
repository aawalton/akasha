import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const swordArtOnline15 = {
  id: "019db533-f38b-72fe-bf0f-c37a9f5fa41d",
  type: "page-type/book",
  slug: "sword-art-online-15",
  title: "Sword Art Online 15",
  status: "not-started",
  author: "Reki Kawahara",
  unit: "unit/words",
  position: 15,
  ownLength: 54000,
  publishedAt: "2018-12-18",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07CRDY3K8",
      externalLink: "https://amazon.com/dp/B07CRDY3K8",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
