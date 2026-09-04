import type { Book } from "../../book.page-type.ts"

export const oldKingdomLirael = {
  id: "019db533-f39a-7ee5-887e-ed69a1388040",
  pageTypeSlug: "book",
  slug: "old-kingdom-lirael",
  title: "Old Kingdom: Lirael",
  kind: "read",
  status: "not-started",
  author: "Garth Nix",
  unitSlug: "words",
  position: 1,
  ownLength: 180000,
  source: "kindle",
  externalId: "B000FC12L4",
  externalLink: "https://www.amazon.com/dp/B000FC12L4",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
