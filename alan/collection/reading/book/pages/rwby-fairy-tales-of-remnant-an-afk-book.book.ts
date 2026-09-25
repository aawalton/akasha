import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const rwbyFairyTalesOfRemnantAnAfkBook = {
  id: "019db533-f38b-71f1-a205-1c8433901579",
  type: "page-type/book",
  slug: "rwby-fairy-tales-of-remnant-an-afk-book",
  title: "RWBY: Fairy Tales of Remnant: An AFK Book",
  status: "not-started",
  unit: "unit/words",
  ownLength: 35250,
  publishedAt: "2020-09-15",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B083JV4N8J",
      externalLink: "https://www.amazon.com/Fairy-Tales-Remnant-RWBY-Myers-ebook/dp/B083JV4N8J",
    },
  ],
} as const satisfies Book
