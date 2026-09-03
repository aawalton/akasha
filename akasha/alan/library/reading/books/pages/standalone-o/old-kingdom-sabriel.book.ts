import type { Book } from "../../book.page-type.ts"

export const oldKingdomSabriel = {
  id: "019db533-f39a-7d48-9ef0-af5f32a2f23b",
  pageTypeSlug: "book",
  slug: "old-kingdom-sabriel",
  title: "Old Kingdom: Sabriel",
  kind: "read",
  status: "not-started",
  author: "Garth Nix",
  unitSlug: "words",
  ownLength: 124000,
  source: "kindle",
  externalId: "B000FC13MM",
  externalLink: "https://www.amazon.com/dp/B000FC13MM",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
