import type { Book } from "../book.page-type.types.ts"

export const apocalypseHealer = {
  id: "019db533-f390-778a-a4ee-22f1195ed9d3",
  pageTypeSlug: "book",
  type: "book",
  slug: "apocalypse-healer",
  title: "Apocalypse Healer",
  status: "not-started",
  author: "Shaun David Hutchinson",
  unit: "words",
  position: 1,
  ownLength: 131500,
  publishedAt: "2025-04-15",
  source: "kindle",
  externalId: "B0F1BLZTMG",
  externalLink: "https://amazon.com/dp/B0F1BLZTMG",
} as const satisfies Book
