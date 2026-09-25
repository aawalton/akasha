import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const scaleAndSeaTrilogyGloamtideGuild = {
  id: "019db533-f38a-7496-b9f1-2aac80e91799",
  type: "page-type/book",
  slug: "scale-and-sea-trilogy-gloamtide-guild",
  title: "Scale & Sea Trilogy: Gloamtide Guild",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 119250,
  ownProgress: 119250,
  publishedAt: "2025-05-31",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F8P8ZF19",
      externalLink: "https://amazon.com/dp/B0F8P8ZF19",
    },
  ],
} as const satisfies Book
