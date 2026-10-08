import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const oldKingdomLirael = {
  id: "019db533-f39a-7ee5-887e-ed69a1388040",
  type: "page-type/book",
  slug: "old-kingdom-lirael",
  title: "Old Kingdom: Lirael",
  status: "not-started",
  author: "Garth Nix",
  unit: "unit/words",
  position: 1,
  ownLength: 180000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FC12L4",
      externalLink: "https://www.amazon.com/dp/B000FC12L4",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
